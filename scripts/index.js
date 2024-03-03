const watchDocumentTitleChange = 
    (previousDocumentTitle, callback) => 
{
    setInterval(() => 
    {
        if (previousDocumentTitle !== document.title) 
        {
            callback(document.title);
            previousDocumentTitle = document.title;
        }
    }, 1000);
}

const getNotificationsCountFromTitle = 
    (documentTitle) => 
{
    const notificationPattern = /\(([0-9]*)\)/;
    const notificationsCount =
        parseInt(
            documentTitle.match(notificationPattern)?.at(1) ?? 0
        );

    return notificationsCount;
}

// Check for navigator.setAppBadge availability
if (navigator.setAppBadge) 
{
    // Start watching for title changes
    watchDocumentTitleChange(
        document.title, 
        (newDocumentTitle) => 
        {
            // Update the application badge on each change
            navigator.setAppBadge(
                getNotificationsCountFromTitle(newDocumentTitle)
            );
        }
    );
}