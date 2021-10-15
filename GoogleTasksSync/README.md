# Google Tasks -> Habitica One-way Sync

Do you like Google Tasks to keep everything in place but also want to level up your character in Habitica? This tool copies all of your Google Tasks to Habitica and checks if any of the GTasks are updated/marked as done and marks the corresponding Habitica todo accordingly.

Limited to 100 tasks per tasklist theoretically, but you'll hit the Google Apps Script runtime limit at that point. Best to limit it at around 50 tasks total (including completed tasks)

# Usage

Change `Habitica.gs` variables with your API keys. Upload all the files to Google Apps script and create a trigger that will run `main()` over a timer. I set mine to 5 minutes.

# Future planned features

* Remove task limitation, maybe keep a backup of the task aliases present in Habitica with Google Sheets or something so that it doesn't run into the Habitica API limits
* Checklist support?
* Two-way sync?
* Trigger-based updating on GTasks. This depends on Google, tho, they don't support it now.

# Changelog
  
v1.1.0 - Works in longer testing, now supports up to 100 tasks per task list.  
v1.0.0-alpha - Works in testing but not completely tested yet
