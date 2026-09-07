IFTIKAR PORTFOLIO WEBSITE — README
====================================

WHAT'S IN THIS FOLDER
----------------------
- index.html, about.html, services.html, contact.html   → your website pages
- styles.css, script.js                                  → shared design and behavior
- data-store.js, site-render.js                           → power the Admin Panel's content
- assets/                                                 → images used on the site
- admin/                                                  → your password-protected Admin Panel


HOW TO PUT YOUR WEBSITE ONLINE (PLAIN LANGUAGE)
-------------------------------------------------
1. Choose a web host. Any standard web hosting plan works (for example: Hostinger,
   Bluehost, GoDaddy, or a free option like Netlify or GitHub Pages).
2. Log in to your hosting account and find the file manager, or use an FTP program
   (like FileZilla) if your host gives you FTP details.
3. Upload EVERY file and folder from this project — keeping the same folder
   structure — into your website's main folder (often called "public_html" or
   "www" or "htdocs").
4. Make sure "index.html" ends up directly inside that main folder (not inside
   a sub-folder), so visiting your domain name shows your homepage.
5. That's it — visit your domain in a browser and your site should be live.

You do not need to install anything else. There is no database to set up.


HOW TO LOG INTO YOUR ADMIN PANEL
-----------------------------------
Go to: yourdomain.com/admin/login.html

Your starting login (for testing only):
    Username: admin
    Password: Admin@123

IMPORTANT — CHANGE THIS BEFORE YOUR SITE GOES LIVE:
1. Log in with the details above.
2. Click "Account & Security" in the left-hand menu.
3. Enter your CURRENT password (Admin@123), then choose a new username and a
   new password (at least 6 characters).
4. Click "Update Login". From then on, use your new details to log in.

Please do this before sharing your website's link with anyone, so nobody
else can access your Admin Panel.


A VERY IMPORTANT THING TO UNDERSTAND ABOUT HOW EDITS WORK
-------------------------------------------------------------
This website does not use a server or database (most simple portfolio sites
don't). Because of that, your Admin Panel saves your edits inside YOUR web
browser's storage, on the device you're using.

This means:
 - The moment you click "Save" in the Admin Panel, your changes appear
   instantly on the website — but only in the browser you're using.
 - Other visitors, browsing from their own computers or phones, will NOT
   automatically see your edits, because their browser doesn't have your
   saved changes.

TO MAKE YOUR EDITS VISIBLE TO EVERYONE ON THE INTERNET:
1. After making your edits and clicking Save, go to "Backup / Export" in
   the Admin Panel.
2. Click "Export Content" — this downloads a file called site-data.json.
3. This file is your record of every edit you've made. Keep it safe.
4. If you ever want a developer to upgrade this site to a real database
   (so edits update instantly for everyone, from any device, without this
   export step), this file is exactly what they'll need to migrate your
   content.

For now, think of the Admin Panel as a way to preview and manage your
content changes easily, and the Export file as your saved record of them.


A NOTE ON IMAGES
-------------------
When you upload a photo in the Admin Panel (profile photo or a project
thumbnail), it's stored directly in your browser. Very large photos can
fill up your browser's storage faster. For best results, resize photos to
a reasonable size (under 1–2 MB each) before uploading them.


QUESTIONS THAT MAY COME UP LATER
-----------------------------------
Q: I forgot my Admin Panel password.
A: Since there's no server, there's no "forgot password" email. Clearing
   your browser's site data for this website will reset the login back to
   the original admin / Admin@123 — but it will also erase any unsaved
   edits in that browser, so export your content first whenever you can.

Q: Can multiple people manage the Admin Panel from different computers?
A: Not with this version — since edits are saved per-browser, only edit
   from one browser/device to avoid confusion about which changes are
   "current." A real multi-editor setup would need a proper backend and
   database.
