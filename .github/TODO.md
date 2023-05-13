# TODO

- [ ] Overhaul help command
   - [ ] Make it use pages instead of a single message
   - [ ] Use action rows for catagory selection
- [X] Move commands to sorted folders
   - [X] Change command loader to load from folders (refer to task two of "Make command handlers")
- [ ] Make command handlers
   - [X] Load commands from folders
   - [ ] Hander for logging interactions and errors :memo: Required by task 2 in task list "Owner stuff"
   - [ ] Handler for blacklist system
   - [ ] Handler for XP system
   - [ ] Handler for Economy system
- [ ] Blacklist system (blacklist users from using the bot)
   - [ ] Add command to add/remove users from blacklist
   - [ ] Add command to view blacklist
   - [ ] Add file to log blacklisted users (most lilkely use a db file for this)
- [ ] Add xp system (Will 100% use db file) :warning: UNTESTED :warning:
   - [X] Command for viewing xp of a user
   - [ ] Leaderboard (global) and show top 9, and your posistion
   - [ ] Owner stuff
     - [X] Add XP/Levels to user
     - [ ] Remove XP/Levels to user
- [ ] Owner stuff
   - [X] Command to reload the bot NOTE: For now it just shuts it down
   - [ ] Command to view logs(?) Note: might just pull from the website or something
     - [ ] Log commands and errors (Referance task two in "Make command handlers") 
   - [X] Command to eval stuff :warning: UNTESTED :warning:
   - [X] System to check if user attempting to access these commands is within the devs ID's // Handled by the commands themselves for now
      - [ ] Blacklist system (blacklist users from using the bot)
         - [X] Add command to add/remove users from blacklist
         - [X] Add command to view blacklist
         - [ ] Add file to log blacklisted users
         > :memo: The owner stuff might be heavy on the system but am unsure would have to test once it is out - Ayden
- [ ] Economy system
> :warning: This will be one of the larger systems as it will be made from scratch - Ayden
   - [ ] Basic commands
      - [ ] Bal command
      - [ ] Deposit command
      - [ ] Withdraw command
      - [ ] Work command
      - [ ] Rob command
   - [ ] A db file for user info (user data go brrrrrrrt)
   - [ ] Invalid money check
   > :memo: This system will only count for money in negitive balances, checked everytime bal is ran
   - [ ] Item shop
      - [ ] Add items to shop (0/10)
      - [ ] Add system for buying and selling items
      - [ ] Inventory system
          - [ ] Seperate db file for inventory's
          - [ ] Add an invalid item check system (Glitched items, just as a precaution)
          - [ ] Add pages, and row selecter for catagory's
   - [ ] Bal top command
       - [ ] Leaderboard (global) and show top 9, and your posistion
       - [ ] Prizes or limited edition items for top 5

# Help

For formatting things in the TODO file please use the following format:

```markdown
- [ ] System (rarely task)
    - [ ] Task or Sub-system
        - [ ] Sub Task
            ...
```

### Footnotes

I (Ayden) will be working on the bot a lot more since I have tortured the website enough