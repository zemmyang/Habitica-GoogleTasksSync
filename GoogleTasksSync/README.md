# Google Tasks -> Habitica One-way Sync

Do you like Google Tasks to keep everything in place but also want to level up your character in Habitica? This tool copies all of your Google Tasks to Habitica and checks if any of the GTasks are updated/marked as done and marks the corresponding Habitica todo accordingly.

# Usage

Change `Habitica.gs` variables with your API keys. Upload all the files to Google Apps script and create a trigger that will run `main()` over a timer. I set mine to 5 minutes, but I have 50 tasks at a time on GTasks at most.

# Future planned features

* Checklist support?
* Two-way sync?
* Trigger-based updating on GTasks. This depends on Google, tho, they don't support it now.

# Changelog
  
v1.0.0-alpha - Works in testing but not completely tested yet
