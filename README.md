# PolitikNörden

## Installation
### [Git Bash](https://gitforwindows.org/) används för att installera och hantera paket
### **1. Node.js och NPM package manager**
Node.js används för backend servern.

Npm hanterar paket och installationer.

needle används för Twitter-modulen.
   #### 1.1 Hämta [node.js](https://nodejs.org/en/download/ "node.js")
   #### 1.2 Verifiera Node.js installation med kommandot: *node -v*
   #### 1.3 Verifiera Npm installation med  kommandot: *npm -v*

### **2. Needle**
 #### 2.1 klona repositoriet från github, extrahera zipfilen. 
 
 #### 2.2 Med gitbash, navigera till den extraherade mappen (politiknorden.main) 

 #### 2.3 kör 'npm install needle' inuti mappen

 #### 2.4 verifiera installation med **npm needle -v**

### 3. Kör programmet

#### 3.1 Kör export BEARER_TOKEN='dinTwitterNyckel' i din bash / unix terminal (exempelvis git bash)
##### Twitter nyckel hämtas från API_KEY.txt som bifogas i .zip filen vid inlämning. 

#### 3.2 Programmet startas genom att köra kommandot  *node app.js* i mappen där repositoriet sparats

![Korrekt output](https://i.imgur.com/W9hQQh7.png)

### 4. Felsökning
#### 4.1 "Error: Cannot find module 'needle'" - Felaktig needle installation, gå till steg 2.2.
#### 4.2 "TypeError: Cannot read properties of undefined (reading 'result_count')" - Twitter API nyckeln fungerar inte, gå till steg 3.1.

