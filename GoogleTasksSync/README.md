# Google Tasks -> Habitica One-way Sync

Do you like Google Tasks to keep everything in place but also want to level up your character in Habitica? This tool copies all of your Google Tasks to Habitica and checks if any of the GTasks are updated/marked as done and marks the corresponding Habitica todo accordingly.

Limited to 100 tasks per tasklist theoretically, but you'll hit the Google Apps Script runtime limit at that point. Best to limit it at around 50 tasks total (including completed tasks)

# Usage

1. Download the `*.gs` files.
2. Find your Habitica API User ID and API Token, available at [this page](https://habitica.com/user/settings/api).
3. Populate the `Habitica.gs` variables `habId` and `habToken` with your API User ID and API Token, respectively.  Note that each occurs four times. 
4. Upload, or copy and paste, all the files into a [Google Apps Script](https://script.google.com/) project.
5. Add the "Tasks API" service to the Apps Script project.
    * From within the project, select the "Services" + then scroll down and add the "Tasks API" service.
6. Add a trigger to the Apps Script project to run  `main` on a timer, e.g., every 5 minutes.  
    * From within the project, select the clock icon on left then the "+ Add Trigger" button on the bottom right.
        * Choose which function to run: "main"
        * Choose which deployment should run: "Head" (the only option)
        * Select event source: "Time-driven"
        * Select type of time based trigger: "Minutes timer" (adjust as desired)
        * Select minute interval: "Every 5 minutes" (adjust as desired)

# Future planned features

* Remove task limitation, maybe keep a backup of the task aliases present in Habitica with Google Sheets or something so that it doesn't run into the Habitica API limits
* Checklist support?
* Two-way sync?
* Trigger-based updating on GTasks. This depends on Google, tho, they don't support it now.

# Changelog
  
v1.1.0 - Works in longer testing, now supports up to 100 tasks per task list.  
v1.0.0-alpha - Works in testing but not completely tested yet
