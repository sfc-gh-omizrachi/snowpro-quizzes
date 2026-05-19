# SnowPro Certification Prep Presentations

This is how I created the app in the first place, not needed if you just want to add or update new certification

## Quiz

Analyze carefully @materials/ folder.
1. prepare a quiz with 500 questions to help to prepare for certification
2. While creating the quiz use proper tools to talk to the Snowflake documentation. Make sure there are no duplicate questions. 
3. Make sure to adapt number of question from each of the domains to weights from the materials. 
4. Create a separate file per domain in `quiz` folder, use `questions_domainX.md` and `answers_domainX.md`. For answers, make sure to provide links to resources where the answer can be found, and always provide a quote from the material.
5. Make sure to support all required types of questions, like single-answer, multi-answer


- Work in parallel, where possible. Be smart in parallelization, like create questions first and in parallel answer each of the questions, spit work more equally as some domains are bigger etc. Think what makes sense to get the best quality as fast as possible
- use `build` directory for intermediate files
- always use `uv` and `pip` in `uv` when needed

Analyze and think carefully, show which resources you will use, and present the plan for approval first.


## Application

Analyze carefully @materials/ and @quiz/ folders in order to build a simple quiz application to run in my browser. 
1. Use appropriate technologies, like javascript, html5 or similar. Make best bet for the tech, but limit dependencies to minimum.
2. Make sure to use weights and mixture of questions as described in requirements for the certification.
3. The app should ask for amount of questions you want to answer, and how much time there is to answer all questions. So if partner wants to answer 25 questions, use weights to pick proper amounts of questions from each domain.
4. The app should offer a clock to simulate real certification experience, with a countdown.
5. There should be an option for marking question for review, and a panel to navigate to the questions marked for review.
6. There should be session support, i.e. a history that traces progress, and which questions were used when and how they were answered. Make sure the quesions don't repeat in one session, they can repeat between sessions.
7. I want to run it locally in a browser.
8. Create the app in the app folder.
9. Make sure to create short description on how to use it.
10. Make it good-looking.
11. I want an option to clear the history.

Plan first carefully, ask questions at the beginning. Ask for confirmation before implementaiton.
