#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const credit = 'json-aginst-humanity'

const cards = [{
        "id": 1,
        "cardType": "A",
        "text": "Flying sex snakes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 2,
        "cardType": "A",
        "text": "Michelle Obama's arms.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 3,
        "cardType": "A",
        "text": "German dungeon porn.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 4,
        "cardType": "A",
        "text": "White people.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 5,
        "cardType": "A",
        "text": "Getting so angry that you pop a boner.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 6,
        "cardType": "A",
        "text": "Tasteful sideboob.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 7,
        "cardType": "A",
        "text": "Praying the gay away.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 8,
        "cardType": "A",
        "text": "Two midgets shitting into a bucket.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 9,
        "cardType": "A",
        "text": "MechaHitler.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 10,
        "cardType": "A",
        "text": "Being a motherfucking sorcerer.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 11,
        "cardType": "A",
        "text": "A disappointing birthday party.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 12,
        "cardType": "A",
        "text": "Puppies!",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 13,
        "cardType": "A",
        "text": "A windmill full of corpses.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 14,
        "cardType": "A",
        "text": "Guys who don't call.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 15,
        "cardType": "A",
        "text": "Racially-biased SAT questions.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 16,
        "cardType": "A",
        "text": "Dying.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 17,
        "cardType": "A",
        "text": "Steven Hawking talking dirty.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 18,
        "cardType": "A",
        "text": "Being on fire.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 19,
        "cardType": "A",
        "text": "A lifetime of sadness.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 20,
        "cardType": "A",
        "text": "An erection that lasts longer than four hours.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 21,
        "cardType": "A",
        "text": "AIDS",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 22,
        "cardType": "A",
        "text": "Same-sex ice dancing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 23,
        "cardType": "A",
        "text": "Glenn Beck catching his scrotum on a curtain hook.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 24,
        "cardType": "A",
        "text": "The Rapture.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 25,
        "cardType": "A",
        "text": "Pterodactyl eggs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 26,
        "cardType": "A",
        "text": "Crippling debt.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 27,
        "cardType": "A",
        "text": "Eugenics.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 28,
        "cardType": "A",
        "text": "Exchanging pleasantries.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 29,
        "cardType": "A",
        "text": "Dying of dysentery.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 30,
        "cardType": "A",
        "text": "Roofies.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 31,
        "cardType": "A",
        "text": "Getting naked and watching Nickelodeon.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 32,
        "cardType": "A",
        "text": "The forbidden fruit.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 33,
        "cardType": "A",
        "text": "Republicans.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 34,
        "cardType": "A",
        "text": "The Big Bang.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 35,
        "cardType": "A",
        "text": "Anal beads.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 36,
        "cardType": "A",
        "text": "Amputees.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 37,
        "cardType": "A",
        "text": "Men.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 38,
        "cardType": "A",
        "text": "Surprise sex!",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 39,
        "cardType": "A",
        "text": "Kim Jong-il.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 40,
        "cardType": "A",
        "text": "Concealing a boner",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 41,
        "cardType": "A",
        "text": "Agriculture.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 42,
        "cardType": "A",
        "text": "Glenn Beck being harried by a swarm of buzzards.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 43,
        "cardType": "A",
        "text": "Making a pouty face.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 44,
        "cardType": "A",
        "text": "A salty surprise.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 45,
        "cardType": "A",
        "text": "The Jews.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 46,
        "cardType": "A",
        "text": "Charisma.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 47,
        "cardType": "A",
        "text": "YOU MUST CONSTRUCT ADDITIONAL PYLONS.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 48,
        "cardType": "A",
        "text": "Panda sex.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 49,
        "cardType": "A",
        "text": "Taking off your shirt.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 50,
        "cardType": "A",
        "text": "A drive-by shooting.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 51,
        "cardType": "A",
        "text": "Ronald Reagan.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 52,
        "cardType": "A",
        "text": "Morgan Freeman's voice.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 53,
        "cardType": "A",
        "text": "Breaking out into song and dance.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 54,
        "cardType": "A",
        "text": "Jewish fraternities.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 55,
        "cardType": "A",
        "text": "Dead babies.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 56,
        "cardType": "A",
        "text": "Masturbation.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 57,
        "cardType": "A",
        "text": "Hormone injections.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 58,
        "cardType": "A",
        "text": "All-you-can-eat shrimp for $4.99.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 59,
        "cardType": "A",
        "text": "Incest.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 60,
        "cardType": "A",
        "text": "Scalping.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 61,
        "cardType": "A",
        "text": "Soup that is too hot.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 62,
        "cardType": "A",
        "text": "The &Uuml;bermensch.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 63,
        "cardType": "A",
        "text": "Nazis.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 64,
        "cardType": "A",
        "text": "Tom Cruise.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 65,
        "cardType": "A",
        "text": "Stifling a giggle at the mention of Hutus and Tutsis.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 66,
        "cardType": "A",
        "text": "Edible underpants.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 67,
        "cardType": "A",
        "text": "The Hustle.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 68,
        "cardType": "A",
        "text": "A Super Soaker&trade; full of cat pee.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 69,
        "cardType": "A",
        "text": "Figgy pudding.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 70,
        "cardType": "A",
        "text": "Object permanence.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 71,
        "cardType": "A",
        "text": "Consultants.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 72,
        "cardType": "A",
        "text": "Intelligent design.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 73,
        "cardType": "A",
        "text": "Nocturnal emissions.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 74,
        "cardType": "A",
        "text": "Uppercuts.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 75,
        "cardType": "A",
        "text": "Being marginalized.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 76,
        "cardType": "A",
        "text": "The profoundly handicapped.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 77,
        "cardType": "A",
        "text": "Obesity.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 78,
        "cardType": "A",
        "text": "Chutzpah.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 79,
        "cardType": "A",
        "text": "Unfathomable stupidity.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 80,
        "cardType": "A",
        "text": "Repression.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 81,
        "cardType": "A",
        "text": "Attitude.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 82,
        "cardType": "A",
        "text": "Passable transvestites.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 83,
        "cardType": "A",
        "text": "Party poopers.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 84,
        "cardType": "A",
        "text": "The American Dream",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 85,
        "cardType": "A",
        "text": "Child beauty pageants.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 86,
        "cardType": "A",
        "text": "Puberty.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 87,
        "cardType": "A",
        "text": "Testicular torsion.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 88,
        "cardType": "A",
        "text": "The folly of man.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 89,
        "cardType": "A",
        "text": "Nickelback.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 90,
        "cardType": "A",
        "text": "Swooping.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 91,
        "cardType": "A",
        "text": "Goats eating cans.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 92,
        "cardType": "A",
        "text": "The KKK.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 93,
        "cardType": "A",
        "text": "Kamikaze pilots.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 94,
        "cardType": "A",
        "text": "Horrifying laser hair removal accidents.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 95,
        "cardType": "A",
        "text": "Adderall&trade;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 96,
        "cardType": "A",
        "text": "A look-see.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 97,
        "cardType": "A",
        "text": "Doing the right thing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 98,
        "cardType": "A",
        "text": "The taint; the grundle; the fleshy fun-bridge.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 99,
        "cardType": "A",
        "text": "Lactation.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 100,
        "cardType": "A",
        "text": "Pabst Blue Ribbon.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 101,
        "cardType": "A",
        "text": "Powerful thighs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 102,
        "cardType": "A",
        "text": "Saxophone solos.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 103,
        "cardType": "A",
        "text": "The gays.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 104,
        "cardType": "A",
        "text": "A middle-aged man on roller skates.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 105,
        "cardType": "A",
        "text": "A foul mouth.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 106,
        "cardType": "A",
        "text": "The thing that electrocutes your abs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 107,
        "cardType": "A",
        "text": "Heteronormativity.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 108,
        "cardType": "A",
        "text": "Cuddling.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 109,
        "cardType": "A",
        "text": "Coat hanger abortions.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 110,
        "cardType": "A",
        "text": "A big hoopla about nothing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 111,
        "cardType": "A",
        "text": "Boogers.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 112,
        "cardType": "A",
        "text": "A hot mess.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 113,
        "cardType": "A",
        "text": "Raptor attacks.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 114,
        "cardType": "A",
        "text": "My collection of high-tech sex toys.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 115,
        "cardType": "A",
        "text": "Fear itself.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 116,
        "cardType": "A",
        "text": "Bees?",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 117,
        "cardType": "A",
        "text": "Getting drunk on mouthwash.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 118,
        "cardType": "A",
        "text": "Sniffing glue.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 119,
        "cardType": "A",
        "text": "Oversized lollipops.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 120,
        "cardType": "A",
        "text": "An icepick lobotomy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 121,
        "cardType": "A",
        "text": "Being rich.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 122,
        "cardType": "A",
        "text": "Friends with benefits.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 123,
        "cardType": "A",
        "text": "Teaching a robot to love.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 124,
        "cardType": "A",
        "text": "Women's suffrage.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 125,
        "cardType": "A",
        "text": "Me time.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 126,
        "cardType": "A",
        "text": "The heart of a child.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 127,
        "cardType": "A",
        "text": "Smallpox blankets.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 128,
        "cardType": "A",
        "text": "The clitoris.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 129,
        "cardType": "A",
        "text": "John Wilkes Booth.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 130,
        "cardType": "A",
        "text": "The glass ceiling.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 131,
        "cardType": "A",
        "text": "Sarah Palin.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 132,
        "cardType": "A",
        "text": "Sexy pillow fights.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 133,
        "cardType": "A",
        "text": "Yeast.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 134,
        "cardType": "A",
        "text": "Full frontal nudity.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 135,
        "cardType": "A",
        "text": "Parting the Red Sea.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 136,
        "cardType": "A",
        "text": "A Bop It&trade;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 137,
        "cardType": "A",
        "text": "Michael Jackson.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 138,
        "cardType": "A",
        "text": "Team-building exercises.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 139,
        "cardType": "A",
        "text": "Harry Potter erotica.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 140,
        "cardType": "A",
        "text": "Authentic Mexican cuisine.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 141,
        "cardType": "A",
        "text": "Frolicking.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 142,
        "cardType": "A",
        "text": "Sexting.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 143,
        "cardType": "A",
        "text": "Grandma.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 144,
        "cardType": "A",
        "text": "Not giving a shit about the Third World.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 145,
        "cardType": "A",
        "text": "Licking things to claim them as your own.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 146,
        "cardType": "A",
        "text": "Genghis Khan.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 147,
        "cardType": "A",
        "text": "The hardworking Mexican.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 148,
        "cardType": "A",
        "text": "RoboCop.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 149,
        "cardType": "A",
        "text": "My relationship status.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 150,
        "cardType": "A",
        "text": "Scrubbing under the folds.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 151,
        "cardType": "A",
        "text": "Porn Stars.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 152,
        "cardType": "A",
        "text": "Horse meat.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 153,
        "cardType": "A",
        "text": "Sunshine and rainbows.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 154,
        "cardType": "A",
        "text": "Expecting a burp and vomiting on the floor.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 155,
        "cardType": "A",
        "text": "Barack Obama.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 156,
        "cardType": "A",
        "text": "Spontaneous human combustion.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 157,
        "cardType": "A",
        "text": "Natural selection.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 158,
        "cardType": "A",
        "text": "Mouth herpes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 159,
        "cardType": "A",
        "text": "Flash flooding.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 160,
        "cardType": "A",
        "text": "Goblins.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 161,
        "cardType": "A",
        "text": "A monkey smoking a cigar.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 162,
        "cardType": "A",
        "text": "Spectacular abs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 163,
        "cardType": "A",
        "text": "A good sniff.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 164,
        "cardType": "A",
        "text": "Wiping her butt.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 165,
        "cardType": "A",
        "text": "The Three-Fifths compromise.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 166,
        "cardType": "A",
        "text": "Pedophiles.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 167,
        "cardType": "A",
        "text": "Doin' it in the butt.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 168,
        "cardType": "A",
        "text": "Being fabulous.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 169,
        "cardType": "A",
        "text": "Mathletes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 170,
        "cardType": "A",
        "text": "Wearing underwear inside-out to avoid doing laundry.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 171,
        "cardType": "A",
        "text": "Nipple blades.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 172,
        "cardType": "A",
        "text": "An M. Night Shyamalan plot twist.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 173,
        "cardType": "A",
        "text": "A bag of magic beans.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 174,
        "cardType": "A",
        "text": "Vigorous jazz hands.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 175,
        "cardType": "A",
        "text": "A defective condom.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 176,
        "cardType": "A",
        "text": "Skeletor.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 177,
        "cardType": "A",
        "text": "Vikings.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 178,
        "cardType": "A",
        "text": "Leaving an awkward voicemail.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 179,
        "cardType": "A",
        "text": "Teenage pregnancy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 180,
        "cardType": "A",
        "text": "Dead parents.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 181,
        "cardType": "A",
        "text": "Hot cheese.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 182,
        "cardType": "A",
        "text": "My sex life.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 183,
        "cardType": "A",
        "text": "A mopey zoo lion.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 184,
        "cardType": "A",
        "text": "Assless chaps.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 185,
        "cardType": "A",
        "text": "Riding off into the sunset.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 186,
        "cardType": "A",
        "text": "Lance Armstrong's missing testicle.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 187,
        "cardType": "A",
        "text": "Sweet, sweet vengeance.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 188,
        "cardType": "A",
        "text": "Genital piercings.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 189,
        "cardType": "A",
        "text": "Keg stands.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 190,
        "cardType": "A",
        "text": "Darth Vader.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 191,
        "cardType": "A",
        "text": "Viagra&reg;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 192,
        "cardType": "A",
        "text": "Necrophilia.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 193,
        "cardType": "A",
        "text": "A really cool hat.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 194,
        "cardType": "A",
        "text": "Toni Morrison's vagina.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 195,
        "cardType": "A",
        "text": "An Oedipus complex.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 196,
        "cardType": "A",
        "text": "The Tempur-Pedic&reg; Swedish Sleep System&trade;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 197,
        "cardType": "A",
        "text": "Preteens.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 198,
        "cardType": "A",
        "text": "Dick fingers.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 199,
        "cardType": "A",
        "text": "A cooler full of organs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 200,
        "cardType": "A",
        "text": "Shapeshifters.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 201,
        "cardType": "A",
        "text": "The Care Bear Stare.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 202,
        "cardType": "A",
        "text": "Erectile dysfunction.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 203,
        "cardType": "A",
        "text": "Keanu Reeves.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 204,
        "cardType": "A",
        "text": "The Virginia Tech Massacre.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 205,
        "cardType": "A",
        "text": "The Underground Railroad.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 206,
        "cardType": "A",
        "text": "The chronic.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 207,
        "cardType": "A",
        "text": "Queefing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 208,
        "cardType": "A",
        "text": "Heartwarming orphans.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 209,
        "cardType": "A",
        "text": "A thermonuclear detonation.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 210,
        "cardType": "A",
        "text": "Cheating in the Special Olympics.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 211,
        "cardType": "A",
        "text": "Tangled Slinkys.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 212,
        "cardType": "A",
        "text": "A moment of silence.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 213,
        "cardType": "A",
        "text": "Civilian casualties.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 214,
        "cardType": "A",
        "text": "Catapults.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 215,
        "cardType": "A",
        "text": "Sharing needles.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 216,
        "cardType": "A",
        "text": "Ethnic cleansing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 217,
        "cardType": "A",
        "text": "Emotions.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 218,
        "cardType": "A",
        "text": "Children on leashes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 219,
        "cardType": "A",
        "text": "Balls.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 220,
        "cardType": "A",
        "text": "Homeless people.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 221,
        "cardType": "A",
        "text": "Eating all of the cookies before the AIDS bake-sale.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 222,
        "cardType": "A",
        "text": "Old-people smell.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 223,
        "cardType": "A",
        "text": "Farting and walking away.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 224,
        "cardType": "A",
        "text": "The inevitable heat death of the universe.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 225,
        "cardType": "A",
        "text": "The violation of our most basic human rights.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 226,
        "cardType": "A",
        "text": "Fingering.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 227,
        "cardType": "A",
        "text": "The placenta.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 228,
        "cardType": "A",
        "text": "The Rev. Dr. Martin Luther King, Jr.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 229,
        "cardType": "A",
        "text": "Leprosy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 230,
        "cardType": "A",
        "text": "Sperm whales.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 231,
        "cardType": "A",
        "text": "Multiple stab wounds.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 232,
        "cardType": "A",
        "text": "Flightless birds.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 233,
        "cardType": "A",
        "text": "Grave robbing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 234,
        "cardType": "A",
        "text": "Home video of Oprah sobbing into a Lean Cuisine&reg;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 235,
        "cardType": "A",
        "text": "Oompa-Loompas.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 236,
        "cardType": "A",
        "text": "A murder most foul.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 237,
        "cardType": "A",
        "text": "Tentacle porn.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 238,
        "cardType": "A",
        "text": "Daddy issues.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 239,
        "cardType": "A",
        "text": "Bill Nye the Science Guy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 240,
        "cardType": "A",
        "text": "Peeing a little bit.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 241,
        "cardType": "A",
        "text": "The miracle of childbirth.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 242,
        "cardType": "A",
        "text": "Tweeting.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 243,
        "cardType": "A",
        "text": "Another goddamn vampire movie.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 244,
        "cardType": "A",
        "text": "Britney Spears at 55.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 245,
        "cardType": "A",
        "text": "New Age music.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 246,
        "cardType": "A",
        "text": "The Make-A-Wish&reg; Foundation.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 247,
        "cardType": "A",
        "text": "Firing a rifle into the air while balls deep in a squealing hog.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 248,
        "cardType": "A",
        "text": "Active listening.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 249,
        "cardType": "A",
        "text": "Nicolas Cage.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 250,
        "cardType": "A",
        "text": "72 virgins.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 251,
        "cardType": "A",
        "text": "Stranger danger.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 252,
        "cardType": "A",
        "text": "Hope.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 253,
        "cardType": "A",
        "text": "A gassy antelope.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 254,
        "cardType": "A",
        "text": "BATMAN!!!",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 255,
        "cardType": "A",
        "text": "Chivalry.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 256,
        "cardType": "A",
        "text": "Passing a kidney stone.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 257,
        "cardType": "A",
        "text": "Black people.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 258,
        "cardType": "A",
        "text": "Natalie Portman.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 259,
        "cardType": "A",
        "text": "A mime having a stroke.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 260,
        "cardType": "A",
        "text": "Classist undertones.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 261,
        "cardType": "A",
        "text": "Sean Penn.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 262,
        "cardType": "A",
        "text": "A mating display.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 263,
        "cardType": "A",
        "text": "The Holy Bible.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 264,
        "cardType": "A",
        "text": "Hot Pockets&reg;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 265,
        "cardType": "A",
        "text": "A sad handjob.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 266,
        "cardType": "A",
        "text": "Pulling out.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 267,
        "cardType": "A",
        "text": "Serfdom.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 268,
        "cardType": "A",
        "text": "Pixelated bukkake.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 269,
        "cardType": "A",
        "text": "Dropping a chandelier on your enemies and riding the rope up.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 270,
        "cardType": "A",
        "text": "Jew-fros.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 271,
        "cardType": "A",
        "text": "Waiting 'til marriage.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 272,
        "cardType": "A",
        "text": "Euphoria&trade; by Calvin Klein.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 273,
        "cardType": "A",
        "text": "The World of Warcraft.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 274,
        "cardType": "A",
        "text": "Lunchables&trade;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 275,
        "cardType": "A",
        "text": "The Kool-Aid Man.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 276,
        "cardType": "A",
        "text": "The Trail of Tears.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 277,
        "cardType": "A",
        "text": "Self-loathing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 278,
        "cardType": "A",
        "text": "A falcon with a cap on its head.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 279,
        "cardType": "A",
        "text": "Historically black colleges.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 280,
        "cardType": "A",
        "text": "Not reciprocating oral sex.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 281,
        "cardType": "A",
        "text": "Global warming.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 282,
        "cardType": "A",
        "text": "Ghosts.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 283,
        "cardType": "A",
        "text": "World peace.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 284,
        "cardType": "A",
        "text": "A can of whoop-ass.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 285,
        "cardType": "A",
        "text": "The Dance of the Sugar Plum Fairy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 286,
        "cardType": "A",
        "text": "A zesty breakfast burrito.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 287,
        "cardType": "A",
        "text": "Switching to Geico&reg;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 288,
        "cardType": "A",
        "text": "Aaron Burr.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 289,
        "cardType": "A",
        "text": "Picking up girls at the abortion clinic.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 290,
        "cardType": "A",
        "text": "Land mines.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 291,
        "cardType": "A",
        "text": "Former President George W. Bush.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 292,
        "cardType": "A",
        "text": "Geese.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 293,
        "cardType": "A",
        "text": "Mutually-assured destruction.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 294,
        "cardType": "A",
        "text": "College.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 295,
        "cardType": "A",
        "text": "Date rape.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 296,
        "cardType": "A",
        "text": "Bling.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 297,
        "cardType": "A",
        "text": "A gentle caress of the inner thigh.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 298,
        "cardType": "A",
        "text": "A time travel paradox.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 299,
        "cardType": "A",
        "text": "Seppuku.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 300,
        "cardType": "A",
        "text": "Poor life choices.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 301,
        "cardType": "A",
        "text": "Waking up half-naked in a Denny's parking lot.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 302,
        "cardType": "A",
        "text": "Italians.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 303,
        "cardType": "A",
        "text": "GoGurt&reg;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 304,
        "cardType": "A",
        "text": "Finger painting.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 305,
        "cardType": "A",
        "text": "Robert Downey, Jr.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 306,
        "cardType": "A",
        "text": "My soul.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 307,
        "cardType": "A",
        "text": "Smegma.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 308,
        "cardType": "A",
        "text": "Embryonic stem cells.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 309,
        "cardType": "A",
        "text": "The South.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 310,
        "cardType": "A",
        "text": "Christopher Walken.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 311,
        "cardType": "A",
        "text": "Gloryholes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 312,
        "cardType": "A",
        "text": "Pretending to care.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 313,
        "cardType": "A",
        "text": "Public ridicule.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 314,
        "cardType": "A",
        "text": "A tiny horse.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 315,
        "cardType": "A",
        "text": "Arnold Schwarzenegger.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 316,
        "cardType": "A",
        "text": "A stray pube.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 317,
        "cardType": "A",
        "text": "Jerking off into a pool of children's tears.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 318,
        "cardType": "A",
        "text": "Child abuse.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 319,
        "cardType": "A",
        "text": "Glenn Beck convulsively vomiting as a brood of crab spiders hatches in his brain and erupts from his tear ducts.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 320,
        "cardType": "A",
        "text": "Menstruation.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 321,
        "cardType": "A",
        "text": "A sassy black woman.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 322,
        "cardType": "A",
        "text": "Re-gifting.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 323,
        "cardType": "A",
        "text": "Penis envy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 324,
        "cardType": "A",
        "text": "A sausage festival.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 325,
        "cardType": "A",
        "text": "Getting really high.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 326,
        "cardType": "A",
        "text": "Drinking alone.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 327,
        "cardType": "A",
        "text": "Too much hair gel.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 328,
        "cardType": "A",
        "text": "Hulk Hogan.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 329,
        "cardType": "A",
        "text": "Overcompensation.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 330,
        "cardType": "A",
        "text": "Foreskin.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 331,
        "cardType": "A",
        "text": "Free samples.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 332,
        "cardType": "A",
        "text": "Shaquille O'Neal's acting career.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 333,
        "cardType": "A",
        "text": "Five-Dollar Footlongs&trade;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 334,
        "cardType": "A",
        "text": "Whipping it out.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 335,
        "cardType": "A",
        "text": "A snapping turtle biting the tip of your penis.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 336,
        "cardType": "A",
        "text": "Muhammad (Praise Be Unto Him).",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 337,
        "cardType": "A",
        "text": "Half-assed foreplay.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 338,
        "cardType": "A",
        "text": "Dental dams.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 339,
        "cardType": "A",
        "text": "Being a dick to children.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 340,
        "cardType": "A",
        "text": "Famine.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 341,
        "cardType": "A",
        "text": "Chainsaws for hands.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 342,
        "cardType": "A",
        "text": "A gypsy curse.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 343,
        "cardType": "A",
        "text": "AXE Body Spray.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 344,
        "cardType": "A",
        "text": "The Force.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 345,
        "cardType": "A",
        "text": "Explosions.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 346,
        "cardType": "A",
        "text": "Cybernetic enhancements.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 347,
        "cardType": "A",
        "text": "Customer service representatives.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 348,
        "cardType": "A",
        "text": "White privilege.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 349,
        "cardType": "A",
        "text": "Gandhi.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 350,
        "cardType": "A",
        "text": "Road head.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 351,
        "cardType": "A",
        "text": "God.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 352,
        "cardType": "A",
        "text": "Poorly-timed Holocaust jokes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 353,
        "cardType": "A",
        "text": "8 oz. of sweet Mexican black-tar heroin.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 354,
        "cardType": "A",
        "text": "Judge Judy.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 355,
        "cardType": "A",
        "text": "The Little Engine That Could.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 356,
        "cardType": "A",
        "text": "Altar boys.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 357,
        "cardType": "A",
        "text": "Mr. Clean, right behind you.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 358,
        "cardType": "A",
        "text": "Vehicular manslaughter.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 359,
        "cardType": "A",
        "text": "Dwarf tossing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 360,
        "cardType": "A",
        "text": "Friction.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 361,
        "cardType": "A",
        "text": "Lady Gaga.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 362,
        "cardType": "A",
        "text": "Scientology.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 363,
        "cardType": "A",
        "text": "Justin Bieber.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 364,
        "cardType": "A",
        "text": "A death ray.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 365,
        "cardType": "A",
        "text": "Vigilante justice.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 366,
        "cardType": "A",
        "text": "The Pope.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 367,
        "cardType": "A",
        "text": "A sea of troubles.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 368,
        "cardType": "A",
        "text": "Alcoholism.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 369,
        "cardType": "A",
        "text": "Poor people.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 370,
        "cardType": "A",
        "text": "A fetus.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 371,
        "cardType": "A",
        "text": "Women in yogurt commercials.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 372,
        "cardType": "A",
        "text": "Exactly what you'd expect.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 373,
        "cardType": "A",
        "text": "Flesh-eating bacteria.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 374,
        "cardType": "A",
        "text": "My genitals.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 375,
        "cardType": "A",
        "text": "A balanced breakfast.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 376,
        "cardType": "A",
        "text": "Dick Cheney.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 377,
        "cardType": "A",
        "text": "Lockjaw.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 378,
        "cardType": "A",
        "text": "Natural male enhancement.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 379,
        "cardType": "A",
        "text": "Take-backsies.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 380,
        "cardType": "A",
        "text": "Winking at old people.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 381,
        "cardType": "A",
        "text": "Opposable thumbs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 382,
        "cardType": "A",
        "text": "Flying sex snakes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 383,
        "cardType": "A",
        "text": "Passive-aggressive Post-it notes.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 384,
        "cardType": "A",
        "text": "Inappropriate yodeling.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 385,
        "cardType": "A",
        "text": "Golden showers.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 386,
        "cardType": "A",
        "text": "Racism.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 387,
        "cardType": "A",
        "text": "Copping a feel.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 388,
        "cardType": "A",
        "text": "Auschwitz.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 389,
        "cardType": "A",
        "text": "Elderly Japanese men.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 390,
        "cardType": "A",
        "text": "Raping and pillaging.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 391,
        "cardType": "A",
        "text": "Kids with ass cancer.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 392,
        "cardType": "A",
        "text": "Pictures of boobs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 393,
        "cardType": "A",
        "text": "The homosexual agenda.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 394,
        "cardType": "A",
        "text": "A homoerotic volleyball montage.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 395,
        "cardType": "A",
        "text": "Sexual tension.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 396,
        "cardType": "A",
        "text": "Hurricane Katrina.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 397,
        "cardType": "A",
        "text": "Fiery poops.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 398,
        "cardType": "A",
        "text": "Science.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 399,
        "cardType": "A",
        "text": "Dry heaving.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 400,
        "cardType": "A",
        "text": "Cards Against Humanity.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 401,
        "cardType": "A",
        "text": "Fancy Feast&reg;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 402,
        "cardType": "A",
        "text": "A bleached asshole.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 403,
        "cardType": "A",
        "text": "Lumberjack fantasies.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 404,
        "cardType": "A",
        "text": "American Gladiators.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 405,
        "cardType": "A",
        "text": "Autocannibalism.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 406,
        "cardType": "A",
        "text": "Sean Connery.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 407,
        "cardType": "A",
        "text": "William Shatner.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 408,
        "cardType": "A",
        "text": "Domino's&trade; Oreo&trade; Dessert Pizza.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 409,
        "cardType": "A",
        "text": "An asymmetric boob job.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 410,
        "cardType": "A",
        "text": "Centaurs.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 411,
        "cardType": "A",
        "text": "A micropenis.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 412,
        "cardType": "A",
        "text": "Asians who aren't good at math.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 413,
        "cardType": "A",
        "text": "The milk man.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 414,
        "cardType": "A",
        "text": "Waterboarding.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 415,
        "cardType": "A",
        "text": "Wifely duties.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 416,
        "cardType": "A",
        "text": "Loose lips.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 417,
        "cardType": "A",
        "text": "The Blood of Christ.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 418,
        "cardType": "A",
        "text": "Actually taking candy from a baby.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 419,
        "cardType": "A",
        "text": "The token minority.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 420,
        "cardType": "A",
        "text": "Jibber-jabber.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 421,
        "cardType": "A",
        "text": "A brain tumor.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 422,
        "cardType": "A",
        "text": "Bingeing and purging.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 423,
        "cardType": "A",
        "text": "A clandestine butt scratch.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 424,
        "cardType": "A",
        "text": "The Chinese gymnastics team.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 425,
        "cardType": "A",
        "text": "Prancing.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 426,
        "cardType": "A",
        "text": "The Hamburglar.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 427,
        "cardType": "A",
        "text": "Police brutality.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 428,
        "cardType": "A",
        "text": "Man meat.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 429,
        "cardType": "A",
        "text": "Forgetting the Alamo.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 430,
        "cardType": "A",
        "text": "Eating the last known bison.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 431,
        "cardType": "A",
        "text": "Crystal meth.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 432,
        "cardType": "A",
        "text": "Booby-trapping the house to foil burglars.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 433,
        "cardType": "A",
        "text": "My inner demons.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 434,
        "cardType": "A",
        "text": "Third base.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 435,
        "cardType": "A",
        "text": "Soiling oneself.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 436,
        "cardType": "A",
        "text": "Laying an egg.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 437,
        "cardType": "A",
        "text": "Giving 110%.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 438,
        "cardType": "A",
        "text": "Hot people.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 439,
        "cardType": "A",
        "text": "Friendly fire.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 440,
        "cardType": "A",
        "text": "Count Chocula.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 441,
        "cardType": "A",
        "text": "Pac-Man uncontrollably guzzling cum.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 442,
        "cardType": "A",
        "text": "Estrogen.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 443,
        "cardType": "A",
        "text": "My vagina.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 444,
        "cardType": "A",
        "text": "Kanye West.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 445,
        "cardType": "A",
        "text": "A robust mongoloid.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 446,
        "cardType": "A",
        "text": "The Donald Trump Seal of Approval&trade;.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 447,
        "cardType": "A",
        "text": "The true meaning of Christmas.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 448,
        "cardType": "A",
        "text": "Her Royal Highness, Queen Elizabeth II.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 449,
        "cardType": "A",
        "text": "An honest cop with nothing left to lose.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 450,
        "cardType": "A",
        "text": "Feeding Rosie O'Donnell.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 451,
        "cardType": "A",
        "text": "The Amish.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 452,
        "cardType": "A",
        "text": "The terrorists.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 453,
        "cardType": "A",
        "text": "When you fart and a little bit comes out.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 454,
        "cardType": "A",
        "text": "Pooping back and forth. Forever.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 455,
        "cardType": "A",
        "text": "Friends who eat all the snacks.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 456,
        "cardType": "A",
        "text": "Cockfights.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 457,
        "cardType": "A",
        "text": "Bitches.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 458,
        "cardType": "A",
        "text": "Seduction.",
        "numAnswers": 0,
        "expansion": "Base"
    },
    {
        "id": 459,
        "cardType": "Q",
        "text": "_?  There's an app for that.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 460,
        "cardType": "Q",
        "text": "Why can't I sleep at night?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 461,
        "cardType": "Q",
        "text": "What's that smell?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 462,
        "cardType": "Q",
        "text": "I got 99 problems but _ ain't one.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 463,
        "cardType": "Q",
        "text": "Maybe she's born with it.  Maybe it's _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 464,
        "cardType": "Q",
        "text": "What's the next Happy Meal&reg; toy?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 465,
        "cardType": "Q",
        "text": "Anthropologists have recently discovered a primitive tribe that worships _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 466,
        "cardType": "Q",
        "text": "It's a pity that kids these days are all getting involved with _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 467,
        "cardType": "Q",
        "text": "During Picasso's often-overlooked Brown Period, he produced hundreds of paintings of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 468,
        "cardType": "Q",
        "text": "Alternative medicine is now embracing the curative powers of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 469,
        "cardType": "Q",
        "text": "And the Academy Award for _ goes to _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 470,
        "cardType": "Q",
        "text": "What's that sound?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 471,
        "cardType": "Q",
        "text": "What ended my last relationship?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 472,
        "cardType": "Q",
        "text": "MTV's new reality show features eight washed-up celebrities living with _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 473,
        "cardType": "Q",
        "text": "I drink to forget _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 474,
        "cardType": "Q",
        "text": "I'm sorry professor, but I couldn't complete my homework because of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 475,
        "cardType": "Q",
        "text": "What is Batman's guilty pleasure?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 476,
        "cardType": "Q",
        "text": "This is the way the world ends <br> This is the way the world ends <br> Not with a bang but with _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 477,
        "cardType": "Q",
        "text": "What's a girl's best friend?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 478,
        "cardType": "Q",
        "text": "TSA guidelines now prohibit _ on airplanes.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 479,
        "cardType": "Q",
        "text": "_.  That's how I want to die.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 480,
        "cardType": "Q",
        "text": "For my next trick, I will pull _ out of _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 481,
        "cardType": "Q",
        "text": "In the new Disney Channel Original Movie, Hannah Montana struggles with _ for the first time.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 482,
        "cardType": "Q",
        "text": "_ is a slippery slope that leads to _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 483,
        "cardType": "Q",
        "text": "What does Dick Cheney prefer?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 484,
        "cardType": "Q",
        "text": "Dear Abby, I'm having some trouble with _ and would like your advice.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 485,
        "cardType": "Q",
        "text": "Instead of coal, Santa now gives the bad children _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 486,
        "cardType": "Q",
        "text": "What's the most emo?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 487,
        "cardType": "Q",
        "text": "In 1,000 years when paper money is but a distant memory, _ will be our currency.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 488,
        "cardType": "Q",
        "text": "What's the next superhero/sidekick duo?",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 489,
        "cardType": "Q",
        "text": "In M. Night Shyamalan's new movie, Bruce Willis discovers that _ had really been _ all along.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 490,
        "cardType": "Q",
        "text": "A romantic, candlelit dinner would be incomplete without _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 491,
        "cardType": "Q",
        "text": "_.  Becha can't have just one!",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 492,
        "cardType": "Q",
        "text": "White people like _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 493,
        "cardType": "Q",
        "text": "_.  High five, bro.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 494,
        "cardType": "Q",
        "text": "Next from J.K. Rowling: Harry Potter and the Chamber of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 495,
        "cardType": "Q",
        "text": "BILLY MAYS HERE FOR _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 496,
        "cardType": "Q",
        "text": "In a world ravaged by _, our only solace is _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 497,
        "cardType": "Q",
        "text": "War!  What is it good for?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 498,
        "cardType": "Q",
        "text": "During sex, I like to think about _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 499,
        "cardType": "Q",
        "text": "What are my parents hiding from me?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 500,
        "cardType": "Q",
        "text": "What will always get you laid?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 501,
        "cardType": "Q",
        "text": "In L.A. County Jail, word is you can trade 200 cigarettes for _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 502,
        "cardType": "Q",
        "text": "What did I bring back from Mexico?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 503,
        "cardType": "Q",
        "text": "What don't you want to find in your Chinese food?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 504,
        "cardType": "Q",
        "text": "What will I bring back in time to convince people that I am a powerful wizard?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 505,
        "cardType": "Q",
        "text": "How am I maintaining my relationship status?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 506,
        "cardType": "Q",
        "text": "_.  It's a trap!",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 507,
        "cardType": "Q",
        "text": "Coming to Broadway this season, _: The Musical.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 508,
        "cardType": "Q",
        "text": "While the United States raced the Soviet Union to the moon, the Mexican government funneled millions of pesos into research on _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 509,
        "cardType": "Q",
        "text": "After the earthquake, Sean Penn brought _ to the people of Haiti.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 510,
        "cardType": "Q",
        "text": "Next on ESPN2, the World Series of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 511,
        "cardType": "Q",
        "text": "Step 1: _.  Step 2: _.  Step 3: Profit.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 512,
        "cardType": "Q",
        "text": "Rumor has it that Vladimir Putin's favorite dish is _ stuffed with _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 513,
        "cardType": "Q",
        "text": "But before I kill you, Mr. Bond, I must show you _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 514,
        "cardType": "Q",
        "text": "What gives me uncontrollable gas?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 515,
        "cardType": "Q",
        "text": "What do old people smell like?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 516,
        "cardType": "Q",
        "text": "The class field trip was completely ruined by _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 517,
        "cardType": "Q",
        "text": "When Pharaoh remained unmoved, Moses called down a Plague of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 518,
        "cardType": "Q",
        "text": "What's my secret power?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 519,
        "cardType": "Q",
        "text": "What's there a ton of in heaven?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 520,
        "cardType": "Q",
        "text": "What would grandma find disturbing, yet oddly charming?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 521,
        "cardType": "Q",
        "text": "I never truly understood _ until I encountered _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 522,
        "cardType": "Q",
        "text": "What did the U.S. airdrop to the children of Afghanistan?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 523,
        "cardType": "Q",
        "text": "What helps Obama unwind?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 524,
        "cardType": "Q",
        "text": "What did Vin Diesel eat for dinner?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 525,
        "cardType": "Q",
        "text": "_: good to the last drop.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 526,
        "cardType": "Q",
        "text": "Why am I sticky?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 527,
        "cardType": "Q",
        "text": "What gets better with age?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 528,
        "cardType": "Q",
        "text": "_: kid-tested, mother-approved.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 529,
        "cardType": "Q",
        "text": "What's the crustiest?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 530,
        "cardType": "Q",
        "text": "What's Teach for America using to inspire inner city students to succeed?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 531,
        "cardType": "Q",
        "text": "Studies show that lab rats navigate mazes 50% faster after being exposed to _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 532,
        "cardType": "Q",
        "text": "Life for American Indians was forever changed when the White Man introduced them to _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 533,
        "cardType": "Q",
        "text": "Make a haiku.",
        "numAnswers": 3,
        "expansion": "Base"
    },
    {
        "id": 534,
        "cardType": "Q",
        "text": "I do not know with what weapons World War III will be fought, but World War IV will be fought with _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 535,
        "cardType": "Q",
        "text": "Why do I hurt all over?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 536,
        "cardType": "Q",
        "text": "What am I giving up for Lent?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 537,
        "cardType": "Q",
        "text": "In Michael Jackson's final moments, he thought about _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 538,
        "cardType": "Q",
        "text": "In an attempt to reach a wider audience, the Smithsonian Museum of Natural History has opened an interactive exhibit on _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 539,
        "cardType": "Q",
        "text": "When I am President of the United States, I will create the Department of _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 540,
        "cardType": "Q",
        "text": "Lifetime&reg; presents _, the story of _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 541,
        "cardType": "Q",
        "text": "When I am a billionaire, I shall erect a 50-foot statue to commemorate _.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 542,
        "cardType": "Q",
        "text": "When I was tripping on acid, _ turned into _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 543,
        "cardType": "Q",
        "text": "That's right, I killed _.  How, you ask?  _.",
        "numAnswers": 2,
        "expansion": "Base"
    },
    {
        "id": 544,
        "cardType": "Q",
        "text": "What's my anti-drug?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 545,
        "cardType": "Q",
        "text": "_ + _ = _.",
        "numAnswers": 3,
        "expansion": "Base"
    },
    {
        "id": 546,
        "cardType": "Q",
        "text": "What never fails to liven up the party?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 547,
        "cardType": "Q",
        "text": "What's the new fad diet?",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 548,
        "cardType": "Q",
        "text": "Major League Baseball has banned _ for giving players an unfair advantage.",
        "numAnswers": 1,
        "expansion": "Base"
    },
    {
        "id": 549,
        "cardType": "A",
        "text": "A big black dick.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 550,
        "cardType": "A",
        "text": "A beached whale.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 551,
        "cardType": "A",
        "text": "A bloody pacifier.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 552,
        "cardType": "A",
        "text": "A crappy little hand.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 553,
        "cardType": "A",
        "text": "A low standard of living.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 554,
        "cardType": "A",
        "text": "A nuanced critique.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 555,
        "cardType": "A",
        "text": "Panty raids.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 556,
        "cardType": "A",
        "text": "A passionate Latino lover.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 557,
        "cardType": "A",
        "text": "A rival dojo.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 558,
        "cardType": "A",
        "text": "A web of lies.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 559,
        "cardType": "A",
        "text": "A woman scorned.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 560,
        "cardType": "A",
        "text": "Clams.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 561,
        "cardType": "A",
        "text": "Apologizing.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 562,
        "cardType": "A",
        "text": "A plunger to the face.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 563,
        "cardType": "A",
        "text": "Neil Patrick Harris.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 564,
        "cardType": "A",
        "text": "Beating your wives.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 565,
        "cardType": "A",
        "text": "Being a dinosaur.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 566,
        "cardType": "A",
        "text": "Shaft.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 567,
        "cardType": "A",
        "text": "Bosnian chicken farmers.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 568,
        "cardType": "A",
        "text": "Nubile slave boys.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 569,
        "cardType": "A",
        "text": "Carnies.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 570,
        "cardType": "A",
        "text": "Coughing into a vagina.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 571,
        "cardType": "A",
        "text": "Suicidal thoughts.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 572,
        "cardType": "A",
        "text": "The ooze.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 573,
        "cardType": "A",
        "text": "Deflowering the princess.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 574,
        "cardType": "A",
        "text": "Dorito breath.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 575,
        "cardType": "A",
        "text": "Eating an albino.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 576,
        "cardType": "A",
        "text": "Enormous Scandinavian women.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 577,
        "cardType": "A",
        "text": "Fabricating statistics.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 578,
        "cardType": "A",
        "text": "Finding a skeleton.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 579,
        "cardType": "A",
        "text": "Gandalf.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 580,
        "cardType": "A",
        "text": "Genetically engineered super-soldiers.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 581,
        "cardType": "A",
        "text": "George Clooney's musk.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 582,
        "cardType": "A",
        "text": "Getting abducted by Peter Pan.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 583,
        "cardType": "A",
        "text": "Getting in her pants, politely.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 584,
        "cardType": "A",
        "text": "Gladiatorial combat.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 585,
        "cardType": "A",
        "text": "Clenched butt cheeks.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 586,
        "cardType": "A",
        "text": "Hipsters.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 587,
        "cardType": "A",
        "text": "Historical revisionism.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 588,
        "cardType": "A",
        "text": "Insatiable bloodlust.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 589,
        "cardType": "A",
        "text": "Jafar.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 590,
        "cardType": "A",
        "text": "Jean-Claude Van Damme.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 591,
        "cardType": "A",
        "text": "Just the tip.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 592,
        "cardType": "A",
        "text": "Mad hacky-sack skills.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 593,
        "cardType": "A",
        "text": "Leveling up.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 594,
        "cardType": "A",
        "text": "Literally eating shit.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 595,
        "cardType": "A",
        "text": "Making the penises kiss.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 596,
        "cardType": "A",
        "text": "24-hour media coverage.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 597,
        "cardType": "A",
        "text": "Medieval Times&copy; Dinner & Tournament.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 598,
        "cardType": "A",
        "text": "Moral ambiguity.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 599,
        "cardType": "A",
        "text": "My machete.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 600,
        "cardType": "A",
        "text": "One thousand Slim Jims.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 601,
        "cardType": "A",
        "text": "Ominous background music.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 602,
        "cardType": "A",
        "text": "Overpowering your father.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 603,
        "cardType": "A",
        "text": "Stockholm Syndrome.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 604,
        "cardType": "A",
        "text": "Quiche.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 605,
        "cardType": "A",
        "text": "Quivering jowls.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 606,
        "cardType": "A",
        "text": "Revenge fucking.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 607,
        "cardType": "A",
        "text": "Ripping into a man's chest and pulling out his still-beating heart.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 608,
        "cardType": "A",
        "text": "Ryan Gosling riding in on a white horse.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 609,
        "cardType": "A",
        "text": "Santa Claus.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 610,
        "cardType": "A",
        "text": "Scrotum tickling.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 611,
        "cardType": "A",
        "text": "Sexual humiliation.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 612,
        "cardType": "A",
        "text": "Sexy Siamese twins.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 613,
        "cardType": "A",
        "text": "Saliva.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 614,
        "cardType": "A",
        "text": "Space muffins.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 615,
        "cardType": "A",
        "text": "Statistically validated stereotypes.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 616,
        "cardType": "A",
        "text": "Sudden Poop Explosion Disease.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 617,
        "cardType": "A",
        "text": "The boners of the elderly.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 618,
        "cardType": "A",
        "text": "The economy.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 619,
        "cardType": "A",
        "text": "Syphilitic insanity.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 620,
        "cardType": "A",
        "text": "The Gulags.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 621,
        "cardType": "A",
        "text": "The harsh light of day.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 622,
        "cardType": "A",
        "text": "The hiccups.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 623,
        "cardType": "A",
        "text": "The shambling corpse of Larry King.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 624,
        "cardType": "A",
        "text": "The four arms of Vishnu.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 625,
        "cardType": "A",
        "text": "Being a busy adult with many important things to do.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 626,
        "cardType": "A",
        "text": "Tripping balls.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 627,
        "cardType": "A",
        "text": "Words, words, words.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 628,
        "cardType": "A",
        "text": "Zeus's sexual appetites.",
        "numAnswers": 0,
        "expansion": "CAHe1"
    },
    {
        "id": 629,
        "cardType": "Q",
        "text": "My plan for world domination begins with _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 630,
        "cardType": "Q",
        "text": "The CIA now interrogates enemy agents by repeatedly subjecting them to _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 631,
        "cardType": "Q",
        "text": "Dear Sir or Madam, We regret to inform you that the Office of _ has denied your request for _",
        "numAnswers": 2,
        "expansion": "CAHe1"
    },
    {
        "id": 632,
        "cardType": "Q",
        "text": "In Rome, there are whisperings that the Vatican has a secret room devoted to _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 633,
        "cardType": "Q",
        "text": "Science will never explain _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 634,
        "cardType": "Q",
        "text": "When all else fails, I can always masturbate to _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 635,
        "cardType": "Q",
        "text": "I learned the hard way that you can't cheer up a grieving friend with _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 636,
        "cardType": "Q",
        "text": "In its new tourism campaign, Detroit proudly proclaims that it has finally eliminated _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 637,
        "cardType": "Q",
        "text": "An international tribunal has found _ guilty of _.",
        "numAnswers": 2,
        "expansion": "CAHe1"
    },
    {
        "id": 638,
        "cardType": "Q",
        "text": "The socialist governments of Scandinavia have declared that access to _ is a basic human right.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 639,
        "cardType": "Q",
        "text": "In his new self-produced album, Kanye West raps over the sounds of _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 640,
        "cardType": "Q",
        "text": "What's the gift that keeps on giving?",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 641,
        "cardType": "Q",
        "text": "Next season on Man vs. Wild, Bear Grylls must survive in the depths of the Amazon with only _ and his wits.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 642,
        "cardType": "Q",
        "text": "When I pooped, what came out of my butt?",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 643,
        "cardType": "Q",
        "text": "In the distant future, historians will agree that _ marked the beginning of America's decline.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 644,
        "cardType": "Q",
        "text": "In a pinch, _ can be a suitable substitute for _.",
        "numAnswers": 2,
        "expansion": "CAHe1"
    },
    {
        "id": 645,
        "cardType": "Q",
        "text": "What has been making life difficult at the nudist colony?",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 646,
        "cardType": "Q",
        "text": "Michael Bay's new three-hour action epic pits _ against _.",
        "numAnswers": 2,
        "expansion": "CAHe1"
    },
    {
        "id": 647,
        "cardType": "Q",
        "text": "And I would have gotten away with it, too, if it hadn't been for _.",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 648,
        "cardType": "Q",
        "text": "What brought the orgy to a grinding halt?",
        "numAnswers": 1,
        "expansion": "CAHe1"
    },
    {
        "id": 649,
        "cardType": "A",
        "text": "A bigger, blacker dick.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 650,
        "cardType": "A",
        "text": "The mere concept of Applebee's&reg;.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 651,
        "cardType": "A",
        "text": "A sad fat dragon with no friends.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 652,
        "cardType": "A",
        "text": "Catastrophic urethral trauma.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 653,
        "cardType": "A",
        "text": "Hillary Clinton's death stare.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 654,
        "cardType": "A",
        "text": "Existing.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 655,
        "cardType": "A",
        "text": "A pinata full of scorpions.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 656,
        "cardType": "A",
        "text": "Mooing.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 657,
        "cardType": "A",
        "text": "Swiftly achieving orgasm.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 658,
        "cardType": "A",
        "text": "Daddy's belt.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 659,
        "cardType": "A",
        "text": "Double penetration.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 660,
        "cardType": "A",
        "text": "Weapons-grade plutonium.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 661,
        "cardType": "A",
        "text": "Some really fucked-up shit.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 662,
        "cardType": "A",
        "text": "Subduing a grizzly bear and making her your wife.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 663,
        "cardType": "A",
        "text": "Rising from the grave.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 664,
        "cardType": "A",
        "text": "The mixing of the races.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 665,
        "cardType": "A",
        "text": "Taking a man's eyes and balls out and putting his eyes where his balls go and then his balls in the eye holes.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 666,
        "cardType": "A",
        "text": "Scrotal frostbite.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 667,
        "cardType": "A",
        "text": "All of this blood.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 668,
        "cardType": "A",
        "text": "Loki, the trickster god.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 669,
        "cardType": "A",
        "text": "Whining like a little bitch.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 670,
        "cardType": "A",
        "text": "Pumping out a baby every nine months.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 671,
        "cardType": "A",
        "text": "Tongue.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 672,
        "cardType": "A",
        "text": "Finding Waldo.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 673,
        "cardType": "A",
        "text": "Upgrading homeless people to mobile hotspots.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 674,
        "cardType": "A",
        "text": "Wearing an octopus for a hat.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 675,
        "cardType": "A",
        "text": "An unhinged ferris wheel rolling toward the sea.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 676,
        "cardType": "A",
        "text": "Living in a trashcan.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 677,
        "cardType": "A",
        "text": "The corporations.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 678,
        "cardType": "A",
        "text": "A magic hippie love cloud.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 679,
        "cardType": "A",
        "text": "Fuck Mountain.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 680,
        "cardType": "A",
        "text": "Survivor's guilt.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 681,
        "cardType": "A",
        "text": "Me.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 682,
        "cardType": "A",
        "text": "Getting hilariously gang-banged by the Blue Man Group.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 683,
        "cardType": "A",
        "text": "Jeff Goldblum.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 684,
        "cardType": "A",
        "text": "Making a friend.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 685,
        "cardType": "A",
        "text": "A soulful rendition of &#34;Ol' Man River.&#34;",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 686,
        "cardType": "A",
        "text": "Intimacy problems.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 687,
        "cardType": "A",
        "text": "A sweaty, panting leather daddy.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 688,
        "cardType": "A",
        "text": "Spring break!",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 689,
        "cardType": "A",
        "text": "Being awesome at sex.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 690,
        "cardType": "A",
        "text": "Dining with cardboard cutouts of the cast of &#34;Friends.&#34;",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 691,
        "cardType": "A",
        "text": "Another shot of morphine.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 692,
        "cardType": "A",
        "text": "Beefin' over turf.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 693,
        "cardType": "A",
        "text": "A squadron of moles wearing aviator goggles.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 694,
        "cardType": "A",
        "text": "Bullshit.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 695,
        "cardType": "A",
        "text": "The Google.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 696,
        "cardType": "A",
        "text": "Pretty Pretty Princess Dress-Up Board Game&#174;.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 697,
        "cardType": "A",
        "text": "The new Radiohead album.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 698,
        "cardType": "A",
        "text": "An army of skeletons.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 699,
        "cardType": "A",
        "text": "A man in yoga pants with a ponytail and feather earrings.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 700,
        "cardType": "A",
        "text": "Mild autism.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 701,
        "cardType": "A",
        "text": "Nunchuck moves.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 702,
        "cardType": "A",
        "text": "Whipping a disobedient slave.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 703,
        "cardType": "A",
        "text": "An ether-soaked rag.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 704,
        "cardType": "A",
        "text": "A sweet spaceship.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 705,
        "cardType": "A",
        "text": "A 55-gallon drum of lube.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 706,
        "cardType": "A",
        "text": "Special musical guest, Cher.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 707,
        "cardType": "A",
        "text": "The human body.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 708,
        "cardType": "A",
        "text": "Boris the Soviet Love Hammer.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 709,
        "cardType": "A",
        "text": "The grey nutrient broth that sustains Mitt Romney.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 710,
        "cardType": "A",
        "text": "Tiny nipples.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 711,
        "cardType": "A",
        "text": "Power.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 712,
        "cardType": "A",
        "text": "Oncoming traffic.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 713,
        "cardType": "A",
        "text": "A dollop of sour cream.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 714,
        "cardType": "A",
        "text": "A slightly shittier parallel universe.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 715,
        "cardType": "A",
        "text": "My first kill.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 716,
        "cardType": "A",
        "text": "Graphic violence, adult language, and some sexual content.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 717,
        "cardType": "A",
        "text": "Fetal alcohol syndrome.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 718,
        "cardType": "A",
        "text": "The day the birds attacked.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 719,
        "cardType": "A",
        "text": "One Ring to rule them all.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 720,
        "cardType": "A",
        "text": "Grandpa's ashes.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 721,
        "cardType": "A",
        "text": "Basic human decency.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 722,
        "cardType": "A",
        "text": "A Burmese tiger pit.",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 723,
        "cardType": "A",
        "text": "Death by Steven Seagal",
        "numAnswers": 0,
        "expansion": "CAHe2"
    },
    {
        "id": 724,
        "cardType": "Q",
        "text": "During his midlife crisis, my dad got really into _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 725,
        "cardType": "Q",
        "text": "_ would be woefully incomplete without _.",
        "numAnswers": 2,
        "expansion": "CAHe2"
    },
    {
        "id": 726,
        "cardType": "Q",
        "text": "My new favorite porn star is Joey &#34;_&#34; McGee.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 727,
        "cardType": "Q",
        "text": "Before I run for president, I must destroy all evidence of my involvement with _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 728,
        "cardType": "Q",
        "text": "This is your captain speaking. Fasten your seatbelts and prepare for _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 729,
        "cardType": "Q",
        "text": "In his newest and most difficult stunt, David Blaine must escape from _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 730,
        "cardType": "Q",
        "text": "The Five Stages of Grief: denial, anger, bargaining, _, and acceptance.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 731,
        "cardType": "Q",
        "text": "My mom freaked out when she looked at my browser history and found _.com/_.",
        "numAnswers": 2,
        "expansion": "CAHe2"
    },
    {
        "id": 732,
        "cardType": "Q",
        "text": "I went from _ to _, all thanks to _.",
        "numAnswers": 3,
        "expansion": "CAHe2"
    },
    {
        "id": 733,
        "cardType": "Q",
        "text": "Members of New York's social elite are paying thousands of dollars just to experience _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 734,
        "cardType": "Q",
        "text": "This month's Cosmo: &#34;Spice up your sex life by bringing _ into the bedroom.&#34;",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 735,
        "cardType": "Q",
        "text": "Little Miss Muffet Sat on a tuffet, Eating her curds and _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 736,
        "cardType": "Q",
        "text": "If God didn't want us to enjoy _, he wouldn't have given us _.",
        "numAnswers": 2,
        "expansion": "CAHe2"
    },
    {
        "id": 737,
        "cardType": "Q",
        "text": "My country, 'tis of thee, sweet land of _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 738,
        "cardType": "Q",
        "text": "After months of debate, the Occupy Wall Street General Assembly could only agree on &#34;More _!&#34;",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 739,
        "cardType": "Q",
        "text": "I spent my whole life working toward _, only to have it ruined by _.",
        "numAnswers": 2,
        "expansion": "CAHe2"
    },
    {
        "id": 740,
        "cardType": "Q",
        "text": "Next time on Dr. Phil: How to talk to your child about _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 741,
        "cardType": "Q",
        "text": "Only two things in life are certain: death and _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 742,
        "cardType": "Q",
        "text": "Everyone down on the ground! We don't want to hurt anyone. We're just here for _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 743,
        "cardType": "Q",
        "text": "The healing process began when I joined a support group for victims of _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 744,
        "cardType": "Q",
        "text": "The votes are in, and the new high school mascot is _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 745,
        "cardType": "Q",
        "text": "Charades was ruined for me forever when my mom had to act out _.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 746,
        "cardType": "Q",
        "text": "Before _, all we had was _.",
        "numAnswers": 2,
        "expansion": "CAHe2"
    },
    {
        "id": 747,
        "cardType": "Q",
        "text": "Tonight on 20/20: What you don't know about _ could kill you.",
        "numAnswers": 1,
        "expansion": "CAHe2"
    },
    {
        "id": 748,
        "cardType": "Q",
        "text": "You haven't truly lived until you've experienced _ and _ at the same time.",
        "numAnswers": 2,
        "expansion": "CAHe2"
    },
    {
        "id": 749,
        "cardType": "Q",
        "text": "D&D 4.0 isn't real D&D because of the _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 750,
        "cardType": "Q",
        "text": "It's a D&D retroclone with _ added.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 751,
        "cardType": "Q",
        "text": "Storygames aren't RPGs because of the _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 752,
        "cardType": "Q",
        "text": "The Slayer's Guide to _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 753,
        "cardType": "Q",
        "text": "Worst character concept ever: _, but with _.",
        "numAnswers": 2,
        "expansion": "CAHgrognards"
    },
    {
        "id": 754,
        "cardType": "Q",
        "text": "Alightment: Chaotic _",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 755,
        "cardType": "Q",
        "text": "It's a D&D retroclone with _ added.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 756,
        "cardType": "Q",
        "text": "What made the paladin fall? _",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 757,
        "cardType": "Q",
        "text": "The portal leads to the quasi-elemental plane of _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 758,
        "cardType": "Q",
        "text": "The Temple of Elemental _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 759,
        "cardType": "Q",
        "text": "Pathfinder is basically D&D _ Edition.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 760,
        "cardType": "Q",
        "text": "_ : The Storytelling Game.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 761,
        "cardType": "Q",
        "text": "People are wondering why Steve Jackson published GURPS _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 762,
        "cardType": "Q",
        "text": "Linear Fighter, Quadratic _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 763,
        "cardType": "Q",
        "text": "You start with 1d4 _ points.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 764,
        "cardType": "Q",
        "text": "Back when I was 12 and I was just starting playing D&D, the game had _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 765,
        "cardType": "Q",
        "text": "Big Eyes, Small _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 766,
        "cardType": "Q",
        "text": "In the grim darkness of the future there is only _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 767,
        "cardType": "Q",
        "text": "My innovative new RPG has a stat for _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 768,
        "cardType": "Q",
        "text": "A true gamer has no problem with _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 769,
        "cardType": "Q",
        "text": "Elminster cast a potent _ spell and then had sex with _.",
        "numAnswers": 2,
        "expansion": "CAHgrognards"
    },
    {
        "id": 770,
        "cardType": "Q",
        "text": "The Deck of Many _.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 771,
        "cardType": "Q",
        "text": "You are all at a tavern when _ approach you.",
        "numAnswers": 1,
        "expansion": "CAHgrognards"
    },
    {
        "id": 772,
        "cardType": "A",
        "text": "Dragon boobs.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 773,
        "cardType": "A",
        "text": "Verisimilitude.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 774,
        "cardType": "A",
        "text": "Dissociated mechanics.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 775,
        "cardType": "A",
        "text": "Rape.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 776,
        "cardType": "A",
        "text": "Storygames.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 777,
        "cardType": "A",
        "text": "Random chargen",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 778,
        "cardType": "A",
        "text": "RPG.net.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 779,
        "cardType": "A",
        "text": "Dice inserted somewhere painful.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 780,
        "cardType": "A",
        "text": "FATAL.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 781,
        "cardType": "A",
        "text": "Ron Edwards' brain damage.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 782,
        "cardType": "A",
        "text": "Boob plate armor.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 783,
        "cardType": "A",
        "text": "Gamer chicks.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 784,
        "cardType": "A",
        "text": "GNS theory.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 785,
        "cardType": "A",
        "text": "Drizzt.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 786,
        "cardType": "A",
        "text": "The entire Palladium Books&reg; Megaverse&trade;",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 787,
        "cardType": "A",
        "text": "BadWrongFun.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 788,
        "cardType": "A",
        "text": "Misogynerds.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 789,
        "cardType": "A",
        "text": "Cultural Marxism.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 790,
        "cardType": "A",
        "text": "Pissing on Gary Gygax's grave.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 791,
        "cardType": "A",
        "text": "Steve Jackson's beard.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 792,
        "cardType": "A",
        "text": "Natural 20.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 793,
        "cardType": "A",
        "text": "Rapenards.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 794,
        "cardType": "A",
        "text": "The Crisis of Treachery&trade;.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 795,
        "cardType": "A",
        "text": "Game balance.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 796,
        "cardType": "A",
        "text": "Fishmalks.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 797,
        "cardType": "A",
        "text": "A kick to the dicebags.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 798,
        "cardType": "A",
        "text": "Bearded dwarven women.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 799,
        "cardType": "A",
        "text": "Owlbear's tears.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 800,
        "cardType": "A",
        "text": "Magic missile.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 801,
        "cardType": "A",
        "text": "THAC0.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 802,
        "cardType": "A",
        "text": "Bigby's Groping Hands.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 803,
        "cardType": "A",
        "text": "Drow blackface.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 804,
        "cardType": "A",
        "text": "Save or die.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 805,
        "cardType": "A",
        "text": "Swine.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 806,
        "cardType": "A",
        "text": "The Forge.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 807,
        "cardType": "A",
        "text": "Healing Surges.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 808,
        "cardType": "A",
        "text": "Gelatinous Cubes.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 809,
        "cardType": "A",
        "text": "Total Party Kill.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 810,
        "cardType": "A",
        "text": "Quoting Monty Python.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 811,
        "cardType": "A",
        "text": "Dumbed down shit for ADD WoW babies.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 812,
        "cardType": "A",
        "text": "Mike Mearls.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 813,
        "cardType": "A",
        "text": "Comeliness.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 814,
        "cardType": "A",
        "text": "Vampire: The Masquerade.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 815,
        "cardType": "A",
        "text": "Rifts&trade;.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 816,
        "cardType": "A",
        "text": "The random prostitute table.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 817,
        "cardType": "A",
        "text": "Dildo of Enlightenment +2",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 818,
        "cardType": "A",
        "text": "Grognards Against Humanity.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 819,
        "cardType": "A",
        "text": "Cthulhu.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 820,
        "cardType": "A",
        "text": "The naked succubus in the Monster Manual.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 821,
        "cardType": "A",
        "text": "Role-playing and roll-playing.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 822,
        "cardType": "A",
        "text": "Fun Tyrant.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 823,
        "cardType": "A",
        "text": "4rries.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 824,
        "cardType": "A",
        "text": "Martial dailies.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 825,
        "cardType": "A",
        "text": "Black Tokyo.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 826,
        "cardType": "A",
        "text": "Killfuck Soulshitter.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 827,
        "cardType": "A",
        "text": "Cheetoism.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 828,
        "cardType": "A",
        "text": "Grimdark.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 829,
        "cardType": "A",
        "text": "Kobolds.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 830,
        "cardType": "A",
        "text": "Oozemaster.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 831,
        "cardType": "A",
        "text": "Rocks fall, everyone dies.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 832,
        "cardType": "A",
        "text": "Mark Rein&middot;Hagen.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 833,
        "cardType": "A",
        "text": "Maid RPG.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 834,
        "cardType": "A",
        "text": "Splugorth blind warrior women.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 835,
        "cardType": "A",
        "text": "Dying during chargen.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 836,
        "cardType": "A",
        "text": "Slaughtering innocent orc children.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 837,
        "cardType": "A",
        "text": "Lesbian stripper ninjas.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 838,
        "cardType": "A",
        "text": "Magical tea party.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 839,
        "cardType": "A",
        "text": "Grinding levels.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 840,
        "cardType": "A",
        "text": "Dice animism.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 841,
        "cardType": "A",
        "text": "White privilege.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 842,
        "cardType": "A",
        "text": "Githyanki therapy.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 843,
        "cardType": "A",
        "text": "Amber Diceless Roleplaying.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 844,
        "cardType": "A",
        "text": "A ratcatcher with a small but vicious dog.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 845,
        "cardType": "A",
        "text": "Bribing the GM with sexual favors.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 846,
        "cardType": "A",
        "text": "Eurocentric fantasy.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 847,
        "cardType": "A",
        "text": "Sacred cows.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 848,
        "cardType": "A",
        "text": "Gygaxian naturalism.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 849,
        "cardType": "A",
        "text": "Special snowflakes.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 850,
        "cardType": "A",
        "text": "Neckbeards.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 851,
        "cardType": "A",
        "text": "Gazebos.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 852,
        "cardType": "A",
        "text": "Lorraine Williams.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 853,
        "cardType": "A",
        "text": "Nude larping.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 854,
        "cardType": "A",
        "text": "Portable holes.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 855,
        "cardType": "A",
        "text": "Steampunk bullshit.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 856,
        "cardType": "A",
        "text": "Dump stats.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 857,
        "cardType": "A",
        "text": "Ale and whores.",
        "numAnswers": 0,
        "expansion": "CAHgrognards"
    },
    {
        "id": 858,
        "cardType": "Q",
        "text": "For the convention I cosplayed as Sailor Moon, except with _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 859,
        "cardType": "Q",
        "text": "The worst part of Grave of the Fireflies is all the _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 860,
        "cardType": "Q",
        "text": "In the Evangelion remake, Shinji has to deal with _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 861,
        "cardType": "Q",
        "text": "Worst anime convention purchase ever? _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 862,
        "cardType": "Q",
        "text": "While powering up Vegeta screamed, _!",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 863,
        "cardType": "Q",
        "text": "You evaded my _ attack. Most impressive.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 864,
        "cardType": "Q",
        "text": "I downloaded a doujin where _ got into _.",
        "numAnswers": 2,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 865,
        "cardType": "Q",
        "text": "The magical girl found out that the Power of Love is useless against _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 866,
        "cardType": "Q",
        "text": "The Japanese government has spent billions of yen researching _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 867,
        "cardType": "Q",
        "text": "In the dubbed version they changed _ into _.",
        "numAnswers": 2,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 868,
        "cardType": "Q",
        "text": "_ is Best Pony.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 869,
        "cardType": "Q",
        "text": "The _ of Haruhi Suzumiya.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 870,
        "cardType": "Q",
        "text": "The new thing in Akihabara is fetish cafes where you can see girls dressed up as _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 871,
        "cardType": "Q",
        "text": "Your drill can pierce _!",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 872,
        "cardType": "Q",
        "text": "Avatar: The Last _ bender.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 873,
        "cardType": "Q",
        "text": "In the name of _ Sailor Moon will punish you!",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 874,
        "cardType": "Q",
        "text": "No harem anime is complete without _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 875,
        "cardType": "Q",
        "text": "My boyfriend's a _ now.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 876,
        "cardType": "Q",
        "text": "The _ of _ has left me in despair!",
        "numAnswers": 2,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 877,
        "cardType": "Q",
        "text": "_.tumblr.com",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 878,
        "cardType": "Q",
        "text": "Somehow they made a cute mascot girl out of _.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 879,
        "cardType": "Q",
        "text": "Haruko hit Naoto in the head with her bass guitar and _ came out.",
        "numAnswers": 1,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 880,
        "cardType": "A",
        "text": "Japanese schoolgirl porn.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 881,
        "cardType": "A",
        "text": "Horny catgirls.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 882,
        "cardType": "A",
        "text": "Japanese people.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 883,
        "cardType": "A",
        "text": "Cimo.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 884,
        "cardType": "A",
        "text": "ZA WARUDO!",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 885,
        "cardType": "A",
        "text": "40 gigs of lolicon.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 886,
        "cardType": "A",
        "text": "Goku's hair.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 887,
        "cardType": "A",
        "text": "Slashfic.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 888,
        "cardType": "A",
        "text": "Star Gentle Uterus",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 889,
        "cardType": "A",
        "text": "Naruto headbands.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 890,
        "cardType": "A",
        "text": "Homestuck troll horns.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 891,
        "cardType": "A",
        "text": "Hayao Miyazaki.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 892,
        "cardType": "A",
        "text": "The tsunami.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 893,
        "cardType": "A",
        "text": "Death Note.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 894,
        "cardType": "A",
        "text": "Small breasts.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 895,
        "cardType": "A",
        "text": "Asians being racist against each other.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 896,
        "cardType": "A",
        "text": "Weeaboo bullshit.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 897,
        "cardType": "A",
        "text": "Tsundere.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 898,
        "cardType": "A",
        "text": "Body pillows.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 899,
        "cardType": "A",
        "text": "A lifelike silicone love doll.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 900,
        "cardType": "A",
        "text": "Anime figures drenched in jizz.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 901,
        "cardType": "A",
        "text": "Surprise sex.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 902,
        "cardType": "A",
        "text": "Yaoi.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 903,
        "cardType": "A",
        "text": "Girls with glasses.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 904,
        "cardType": "A",
        "text": "Bronies.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 905,
        "cardType": "A",
        "text": "Blue and white striped panties.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 906,
        "cardType": "A",
        "text": "4chan.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 907,
        "cardType": "A",
        "text": "Hello Kitty vibrator.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 908,
        "cardType": "A",
        "text": "Finishing attack.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 909,
        "cardType": "A",
        "text": "Keikaku* *(keikaku means plan).",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 910,
        "cardType": "A",
        "text": "Hatsune Miku's screams.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 911,
        "cardType": "A",
        "text": "School swimsuits.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 912,
        "cardType": "A",
        "text": "Lovingly animated bouncing boobs.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 913,
        "cardType": "A",
        "text": "Dragon Balls.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 914,
        "cardType": "A",
        "text": "Zangief's chest hair.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 915,
        "cardType": "A",
        "text": "DeviantArt.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 916,
        "cardType": "A",
        "text": "Giant fucking robots.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 917,
        "cardType": "A",
        "text": "Crossplay.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 918,
        "cardType": "A",
        "text": "Moeblob.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 919,
        "cardType": "A",
        "text": "Carl Macek's rotting corpse.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 920,
        "cardType": "A",
        "text": "My waifu.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 921,
        "cardType": "A",
        "text": "Voice actress Megumi Hayashibara.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 922,
        "cardType": "A",
        "text": "Lynn Minmei.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 923,
        "cardType": "A",
        "text": "Panty shots.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 924,
        "cardType": "A",
        "text": "Love and Justice.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 925,
        "cardType": "A",
        "text": "Consensual tentacle rape.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 926,
        "cardType": "A",
        "text": "Gundam.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 927,
        "cardType": "A",
        "text": "Captain Bright slapping Amuro.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 928,
        "cardType": "A",
        "text": "The Wave Undulation Cannon.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 929,
        "cardType": "A",
        "text": "Having sex in the P.E. equipment shed.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 930,
        "cardType": "A",
        "text": "Tainted sushi.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 931,
        "cardType": "A",
        "text": "Shitty eurobeat music.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 932,
        "cardType": "A",
        "text": "Bad dubbing.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 933,
        "cardType": "A",
        "text": "Fangirls.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 934,
        "cardType": "A",
        "text": "Kawaii desu uguu.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 935,
        "cardType": "A",
        "text": "Futanari.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 936,
        "cardType": "A",
        "text": "Lesbian schoolgirls.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 937,
        "cardType": "A",
        "text": "Osamu Tezuka, rolling in his grave forever.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 938,
        "cardType": "A",
        "text": "FUNimation.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 939,
        "cardType": "A",
        "text": "Underage cosplayers in bondage gear.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 940,
        "cardType": "A",
        "text": "Jackie Chan.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 941,
        "cardType": "A",
        "text": "Exchanging Pocky for sexual favors.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 942,
        "cardType": "A",
        "text": "Shipping.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 943,
        "cardType": "A",
        "text": "Chiyo's father.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 944,
        "cardType": "A",
        "text": "Magikarp.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 945,
        "cardType": "A",
        "text": "Derpy.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 946,
        "cardType": "A",
        "text": "Nanoha and her special friend Fate.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 947,
        "cardType": "A",
        "text": "The marbles from Ramune bottles.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 948,
        "cardType": "A",
        "text": "Wideface.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 949,
        "cardType": "A",
        "text": "Spoilers.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 950,
        "cardType": "A",
        "text": "Man-Faye.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 951,
        "cardType": "A",
        "text": "Oppai mousepads.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 952,
        "cardType": "A",
        "text": "Another dimension.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 953,
        "cardType": "A",
        "text": "Homura sniffing Madoka's panties.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 954,
        "cardType": "A",
        "text": "Hadouken.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 955,
        "cardType": "A",
        "text": "Asian ball-jointed dolls.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 956,
        "cardType": "A",
        "text": "J-list.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 957,
        "cardType": "A",
        "text": "Childhood friends.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 958,
        "cardType": "A",
        "text": "Monkey D. Luffy's rubbery cock.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 959,
        "cardType": "A",
        "text": "Cloud's giant fucking Buster Swords.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 960,
        "cardType": "A",
        "text": "Taking a dump in Char's helmet.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 961,
        "cardType": "A",
        "text": "Hentai marathons.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 962,
        "cardType": "A",
        "text": "Gothic Lolita.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 963,
        "cardType": "A",
        "text": "Onaholes.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 964,
        "cardType": "A",
        "text": "Super Saiyan Level 2.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 965,
        "cardType": "A",
        "text": "Gaia Online.",
        "numAnswers": 0,
        "expansion": "CAHweeaboo"
    },
    {
        "id": 966,
        "cardType": "Q",
        "text": "After blacking out during New year's Eve, I was awoken by _.",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 967,
        "cardType": "Q",
        "text": "This holiday season, Tim Allen must overcome his fear of _ to save Christmas.",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 968,
        "cardType": "Q",
        "text": "Jesus is _.",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 969,
        "cardType": "Q",
        "text": "Every Christmas, my uncle gets drunk and tells the story about _.",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 970,
        "cardType": "Q",
        "text": "What keeps me warm during the cold, cold, winter?",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 971,
        "cardType": "Q",
        "text": "On the third day of Christmas, my true love gave to me: three French hens, two turtle doves, and _.",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 972,
        "cardType": "Q",
        "text": "Wake up, America. Christmas is under attack by secular liberals and their _.",
        "numAnswers": 1,
        "expansion": "CAHxmas"
    },
    {
        "id": 973,
        "cardType": "A",
        "text": "Santa's heavy sack.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 974,
        "cardType": "A",
        "text": "Clearing a bloody path through Walmart with a scimitar.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 975,
        "cardType": "A",
        "text": "Another shitty year.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 976,
        "cardType": "A",
        "text": "Whatever Kwanzaa is supposed to be about.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 977,
        "cardType": "A",
        "text": "A Christmas stocking full of coleslaw.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 978,
        "cardType": "A",
        "text": "Elf cum.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 979,
        "cardType": "A",
        "text": "The tiny, calloused hands of the Chinese children that made this card.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 980,
        "cardType": "A",
        "text": "Taking down Santa with a surface-to-air missile.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 981,
        "cardType": "A",
        "text": "Socks.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 982,
        "cardType": "A",
        "text": "Pretending to be happy.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 983,
        "cardType": "A",
        "text": "Krampus, the Austrian Christmas monster.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 984,
        "cardType": "A",
        "text": "The Star Wars Holiday Special.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 985,
        "cardType": "A",
        "text": "My hot cousin.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 986,
        "cardType": "A",
        "text": "Mall Santa.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 987,
        "cardType": "A",
        "text": "Several intertwining love stories featuring Hugh Grant.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 988,
        "cardType": "A",
        "text": "A Hungry-Man&trade; Frozen Christmas Dinner for one.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 989,
        "cardType": "A",
        "text": "Gift-wrapping a live hamster.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 990,
        "cardType": "A",
        "text": "Space Jam on VHS.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 991,
        "cardType": "A",
        "text": "Immaculate conception.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 992,
        "cardType": "A",
        "text": "Fucking up 'Silent Night' in front of 300 parents.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 993,
        "cardType": "A",
        "text": "A visually arresting turtleneck.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 994,
        "cardType": "A",
        "text": "A toxic family environment.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 995,
        "cardType": "A",
        "text": "Eating an entire snowman.",
        "numAnswers": 0,
        "expansion": "CAHxmas"
    },
    {
        "id": 996,
        "cardType": "A",
        "text": "Bumpses.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 997,
        "cardType": "A",
        "text": "A Vin Gerard H8 X 10.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 998,
        "cardType": "Q",
        "text": "We got the third rope, now where's the fourth?",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 999,
        "cardType": "A",
        "text": "Harry Acropolis.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1000,
        "cardType": "A",
        "text": "Under the ring.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1001,
        "cardType": "Q",
        "text": "Tonights main event, _ vs. _.",
        "numAnswers": 2,
        "expansion": "NEIndy"
    },
    {
        "id": 1002,
        "cardType": "A",
        "text": "Afa The Wild Samoan.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1003,
        "cardType": "Q",
        "text": "Tackle, Dropdown, _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1004,
        "cardType": "A",
        "text": "Peanut Butter and Baby sandwiches.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1005,
        "cardType": "Q",
        "text": "Christopher Daniels is late on his _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1006,
        "cardType": "A",
        "text": "Yard Tards.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1007,
        "cardType": "A",
        "text": "Two girls, one cup.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1008,
        "cardType": "A",
        "text": "Ugly Mexican Hookers.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1009,
        "cardType": "A",
        "text": "Duct tape.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1010,
        "cardType": "A",
        "text": "Sodaj.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1011,
        "cardType": "Q",
        "text": "Instead of booking _, they should have booked _.",
        "numAnswers": 2,
        "expansion": "NEIndy"
    },
    {
        "id": 1012,
        "cardType": "Q",
        "text": "Genius is 10% inspiration, 90% _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1013,
        "cardType": "Q",
        "text": "They found _ in the dumpster behind _.",
        "numAnswers": 2,
        "expansion": "NEIndy"
    },
    {
        "id": 1014,
        "cardType": "A",
        "text": "Steve The Teacher.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1015,
        "cardType": "Q",
        "text": "The best thing I ever got for Christmas was _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1016,
        "cardType": "A",
        "text": "Jefferee.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1017,
        "cardType": "Q",
        "text": "There's no crying in _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1018,
        "cardType": "Q",
        "text": "Mastodon! Pterodactyl! Triceratops! Sabretooth Tiger! _!",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1019,
        "cardType": "A",
        "text": "Autoerotic Asphyxiation.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1020,
        "cardType": "Q",
        "text": "Don't eat the _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1021,
        "cardType": "A",
        "text": "Sonic The Hedgehog.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1022,
        "cardType": "A",
        "text": "Lotto Money.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1023,
        "cardType": "Q",
        "text": "He did _ with the _!?!",
        "numAnswers": 2,
        "expansion": "NEIndy"
    },
    {
        "id": 1024,
        "cardType": "A",
        "text": "Jailbait.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1025,
        "cardType": "A",
        "text": "Prison rape.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1026,
        "cardType": "Q",
        "text": "SOOOOO hot, want to touch the _.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1027,
        "cardType": "Q",
        "text": "Stop looking at me _!",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1028,
        "cardType": "A",
        "text": "Two And A Half Men.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1029,
        "cardType": "A",
        "text": "Anne Frank.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1030,
        "cardType": "A",
        "text": "Black Santa.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1031,
        "cardType": "Q",
        "text": "I'm cuckoo for _ puffs.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1032,
        "cardType": "Q",
        "text": "Silly rabbit, _ are for kids.",
        "numAnswers": 1,
        "expansion": "NEIndy"
    },
    {
        "id": 1033,
        "cardType": "A",
        "text": "Jesus Christ (our lord and saviour).",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1034,
        "cardType": "A",
        "text": "Farting with your armpits.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1035,
        "cardType": "A",
        "text": "Poopsicles.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1036,
        "cardType": "A",
        "text": "Slaughtering innocent children.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1037,
        "cardType": "A",
        "text": "Sex with vegetables.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1038,
        "cardType": "A",
        "text": "My gay ex-husband.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1039,
        "cardType": "A",
        "text": "Accidentally sexting your mom.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1040,
        "cardType": "A",
        "text": "Tabasco in your pee-hole.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1041,
        "cardType": "A",
        "text": "Pee Wee Herman.",
        "numAnswers": 0,
        "expansion": "NEIndy"
    },
    {
        "id": 1042,
        "cardType": "A",
        "text": "A breath of fresh air.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1043,
        "cardType": "A",
        "text": "A great big floppy donkey dick.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1044,
        "cardType": "A",
        "text": "A pyramid scheme.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1045,
        "cardType": "A",
        "text": "A school bus surrounded by cop cars.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1046,
        "cardType": "A",
        "text": "A short walk in the desert with shovels.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1047,
        "cardType": "A",
        "text": "All the boys staring at your chest.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1048,
        "cardType": "A",
        "text": "An amorous stallion.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1049,
        "cardType": "A",
        "text": "Being so wet it just slides out of you.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1050,
        "cardType": "A",
        "text": "Being tarred and feathered.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1051,
        "cardType": "A",
        "text": "Catching 'em all.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1052,
        "cardType": "A",
        "text": "Chained to the bed and whipped to orgasmic bliss by a leather-clad woman.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1053,
        "cardType": "A",
        "text": "Child-bearing hips.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1054,
        "cardType": "A",
        "text": "Defenestration.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1055,
        "cardType": "A",
        "text": "Dungeons and/or dragons.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1056,
        "cardType": "A",
        "text": "Ecco the Dolphin.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1057,
        "cardType": "A",
        "text": "George Washington riding on a giant eagle.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1058,
        "cardType": "A",
        "text": "Getting abducted and probed by aliens.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1059,
        "cardType": "A",
        "text": "Going viral on YouTube.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1060,
        "cardType": "A",
        "text": "Gushing.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1061,
        "cardType": "A",
        "text": "Making the baby Jesus cry.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1062,
        "cardType": "A",
        "text": "More than you can chew.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1063,
        "cardType": "A",
        "text": "Napalm.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1064,
        "cardType": "A",
        "text": "Pancake bitches.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1065,
        "cardType": "A",
        "text": "Playing God with the power of lightning.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1066,
        "cardType": "A",
        "text": "Playing tonsil-hockey.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1067,
        "cardType": "A",
        "text": "Racing cheese wheels downhill.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1068,
        "cardType": "A",
        "text": "Riding the bomb.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1069,
        "cardType": "A",
        "text": "Settling arguments with dance-offs.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1070,
        "cardType": "A",
        "text": "Sheer spite.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1071,
        "cardType": "A",
        "text": "Sinister laughter.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1072,
        "cardType": "A",
        "text": "SS Girls.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1073,
        "cardType": "A",
        "text": "Stealing your sister's underwear.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1074,
        "cardType": "A",
        "text": "Stroking a cat the wrong way.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1075,
        "cardType": "A",
        "text": "Sucking and blowing.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1076,
        "cardType": "A",
        "text": "The bullet with your name on it.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1077,
        "cardType": "A",
        "text": "The entire rest of eternity, spent in fucking Bruges.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1078,
        "cardType": "A",
        "text": "The oceans rising to reclaim the land.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1079,
        "cardType": "A",
        "text": "A cocained-fuelled sex orgy heart attack.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1080,
        "cardType": "A",
        "text": "A cocktail umbrella ",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1081,
        "cardType": "A",
        "text": "A murder/suicide pact.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1082,
        "cardType": "A",
        "text": "A squirming mass of kittens.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1083,
        "cardType": "A",
        "text": "An angry mob with torches and pitchforks.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1084,
        "cardType": "A",
        "text": "Biting my girlfriend like a vampire during sex.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1085,
        "cardType": "A",
        "text": "Dropping your pants and saluting.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1086,
        "cardType": "A",
        "text": "Frankenstein's Monster",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1087,
        "cardType": "A",
        "text": "Getting a blowjob in a theater.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1088,
        "cardType": "A",
        "text": "Going full retard.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1089,
        "cardType": "A",
        "text": "Going slob-slob-slob all over that knob.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1090,
        "cardType": "A",
        "text": "Leaking implants.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1091,
        "cardType": "A",
        "text": "Low-flying planes.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1092,
        "cardType": "A",
        "text": "Monkies flinging their own shit.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1093,
        "cardType": "A",
        "text": "My robot duplicate.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1094,
        "cardType": "A",
        "text": "Other people’s children.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1095,
        "cardType": "A",
        "text": "People who can't take a joke. Seriously.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1096,
        "cardType": "A",
        "text": "Popping a boner during Sex Ed class.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1097,
        "cardType": "A",
        "text": "Projectile vomiting.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1098,
        "cardType": "A",
        "text": "Pulling down panties with your teeth.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1099,
        "cardType": "A",
        "text": "Saying ",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1100,
        "cardType": "A",
        "text": "Shedding skin like a snake.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1101,
        "cardType": "A",
        "text": "Shooting Valley Girls for like, saying like all the time. Really.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1102,
        "cardType": "A",
        "text": "Slow seductive tentacle rape.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1103,
        "cardType": "A",
        "text": "Talking like a pirate, y’arr!",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1104,
        "cardType": "A",
        "text": "Tenderly kissing a unicorn's horn.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1105,
        "cardType": "A",
        "text": "That bastard Jesus!",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1106,
        "cardType": "A",
        "text": "The last shreads of dignity.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1107,
        "cardType": "A",
        "text": "The power of friendship.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1108,
        "cardType": "A",
        "text": "This card intentionally left blank.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1109,
        "cardType": "A",
        "text": "Throwing water on a braless woman in a white t-shirt",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1110,
        "cardType": "A",
        "text": "Upskirts.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1111,
        "cardType": "A",
        "text": "Wasting all your money on hookers and booze.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1112,
        "cardType": "A",
        "text": "Winning.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1113,
        "cardType": "A",
        "text": "A foot fetish.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1114,
        "cardType": "A",
        "text": "A powerful gag reflex.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1115,
        "cardType": "A",
        "text": "A tight, Asian pussy.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1116,
        "cardType": "A",
        "text": "Explosive decompression.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1117,
        "cardType": "A",
        "text": "Extraordinary Rendition.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1118,
        "cardType": "A",
        "text": "Forgetting the safety word.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1119,
        "cardType": "A",
        "text": "Greeting Christmas carollers naked.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1120,
        "cardType": "A",
        "text": "Handcuffs, without the key.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1121,
        "cardType": "A",
        "text": "Having a drill for a penis.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1122,
        "cardType": "A",
        "text": "Hot Jailbait Ass.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1123,
        "cardType": "A",
        "text": "Liposuction gone horrible wrong.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1124,
        "cardType": "A",
        "text": "My harem of scantily clad women.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1125,
        "cardType": "A",
        "text": "Nazi Zombie Robot Ninjas.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1126,
        "cardType": "A",
        "text": "Redneck gypsies.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1127,
        "cardType": "A",
        "text": "Scissoring.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1128,
        "cardType": "A",
        "text": "A guy and two robots who won’t shut up.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1129,
        "cardType": "A",
        "text": "A shotgun wedding.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1130,
        "cardType": "A",
        "text": "Anne Frank's diary",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1131,
        "cardType": "A",
        "text": "Autoerotic asphyxiation.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1132,
        "cardType": "A",
        "text": "Blow Up Bianca the Latex Lovedoll.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1133,
        "cardType": "A",
        "text": "Endlessly tumbling down an up escalator.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1134,
        "cardType": "A",
        "text": "Fun with nuns.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1135,
        "cardType": "A",
        "text": "Getting it all over the walls.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1136,
        "cardType": "A",
        "text": "Holiday Dinner by Jack Daniels.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1137,
        "cardType": "A",
        "text": "Nailgun fights.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1138,
        "cardType": "A",
        "text": "Teaching the bitch a lesson.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1139,
        "cardType": "A",
        "text": "Nazi super science.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1140,
        "cardType": "A",
        "text": "Making a human centipede.",
        "numAnswers": 0,
        "expansion": "NSFH"
    },
    {
        "id": 1141,
        "cardType": "Q",
        "text": "Between love and madness lies _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1142,
        "cardType": "Q",
        "text": "Instead of chess, the Grim Reaper now gambles for your soul with a game of _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1143,
        "cardType": "Q",
        "text": "My father gave his life fighting to protect _ from _.",
        "numAnswers": 2,
        "expansion": "NSFH"
    },
    {
        "id": 1144,
        "cardType": "Q",
        "text": "Why is my throat sore?",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1145,
        "cardType": "Q",
        "text": "_ sparked a city-wide riot that only ended with _.",
        "numAnswers": 2,
        "expansion": "NSFH"
    },
    {
        "id": 1146,
        "cardType": "Q",
        "text": "I’m very sorry Mrs. Smith, but Little Billy has tested positive for _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1147,
        "cardType": "Q",
        "text": "Instead of beating them, Chris Brown now does _ to women.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1148,
        "cardType": "Q",
        "text": "Instead of cutting, trendy young emo girls now engage in _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1149,
        "cardType": "Q",
        "text": "The definition of rock bottom is gambling away _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1150,
        "cardType": "Q",
        "text": "The Mayan prophecies really heralded the coming of _ in 2012.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1151,
        "cardType": "Q",
        "text": "The next US election will be fought on the key issues of _ against _.",
        "numAnswers": 2,
        "expansion": "NSFH"
    },
    {
        "id": 1152,
        "cardType": "Q",
        "text": "When I was 10 I wrote to Santa wishing for _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1153,
        "cardType": "Q",
        "text": "Where or How I met my last signifigant other: _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1154,
        "cardType": "Q",
        "text": "_, Never leave home without it.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1155,
        "cardType": "Q",
        "text": "_. This is my fetish.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1156,
        "cardType": "Q",
        "text": "David Icke's newest conspiracy theory states that _ caused _.",
        "numAnswers": 2,
        "expansion": "NSFH"
    },
    {
        "id": 1157,
        "cardType": "Q",
        "text": "I did _ so you don't have to!",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1158,
        "cardType": "Q",
        "text": "I need your clothes, your bike, and _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1159,
        "cardType": "Q",
        "text": "In a new Cold War retro movie, the red menace tries to conquer the world through the cunning use of _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1160,
        "cardType": "Q",
        "text": "In college, our lecturer made us write a report comparing _ to _.",
        "numAnswers": 2,
        "expansion": "NSFH"
    },
    {
        "id": 1161,
        "cardType": "Q",
        "text": "In The Hangover part 3, those four guys have to deal with _, _, and _.",
        "numAnswers": 3,
        "expansion": "NSFH"
    },
    {
        "id": 1162,
        "cardType": "Q",
        "text": "My zombie survival kit includes food, water, and _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1163,
        "cardType": "Q",
        "text": "The way to a man's heart is through _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1164,
        "cardType": "Q",
        "text": "What was the theme of my second wedding?",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1165,
        "cardType": "Q",
        "text": "What's the newest Japanese craze to head West?",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1166,
        "cardType": "Q",
        "text": "Everybody loves _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1167,
        "cardType": "Q",
        "text": "I can only express myself through _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1168,
        "cardType": "Q",
        "text": "My new porn DVD was completely ruined by the inclusion of _",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1169,
        "cardType": "Q",
        "text": "My three wishes will be for _, _, and _.",
        "numAnswers": 3,
        "expansion": "NSFH"
    },
    {
        "id": 1170,
        "cardType": "Q",
        "text": "The latest horrifying school shooting was inspired by _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1171,
        "cardType": "Q",
        "text": "I got fired because of my not-so-secret obsession over _.",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1172,
        "cardType": "Q",
        "text": "My new favourite sexual position is _",
        "numAnswers": 1,
        "expansion": "NSFH"
    },
    {
        "id": 1173,
        "cardType": "A",
        "text": "The primal, ball-slapping sex your parents are having right now.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1174,
        "cardType": "A",
        "text": "A cat video so cute that your eyes roll back and your spine slides out of your anus.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1175,
        "cardType": "A",
        "text": "Cock.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1176,
        "cardType": "A",
        "text": "A cop who is also a dog.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1177,
        "cardType": "A",
        "text": "Dying alone and in pain.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1178,
        "cardType": "A",
        "text": "Gay aliens.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1179,
        "cardType": "A",
        "text": "The way white people is.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1180,
        "cardType": "A",
        "text": "Reverse cowgirl.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1181,
        "cardType": "A",
        "text": "The Quesadilla Explosion Salad&trade; from Chili's&copy;.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1182,
        "cardType": "A",
        "text": "Actually getting shot, for real.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1183,
        "cardType": "A",
        "text": "Not having sex.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1184,
        "cardType": "A",
        "text": "Vietnam flashbacks.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1185,
        "cardType": "A",
        "text": "Running naked through a mall, pissing and shitting everywhere.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1186,
        "cardType": "A",
        "text": "Nothing.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1187,
        "cardType": "A",
        "text": "Warm, velvety muppet sex.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1188,
        "cardType": "A",
        "text": "Self-flagellation.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1189,
        "cardType": "A",
        "text": "The systematic destruction of an entire people and their way of life.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1190,
        "cardType": "A",
        "text": "Samuel L. Jackson.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1191,
        "cardType": "A",
        "text": "A boo-boo.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1192,
        "cardType": "A",
        "text": "Going around punching people.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1193,
        "cardType": "A",
        "text": "The entire Internet.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1194,
        "cardType": "A",
        "text": "Some kind of bird-man.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1195,
        "cardType": "A",
        "text": "Chugging a lava lamp.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1196,
        "cardType": "A",
        "text": "Having sex on top of a pizza.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1197,
        "cardType": "A",
        "text": "Indescribable loneliness.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1198,
        "cardType": "A",
        "text": "An ass disaster.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1199,
        "cardType": "A",
        "text": "Shutting the fuck up.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1200,
        "cardType": "A",
        "text": "All my friends dying.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1201,
        "cardType": "A",
        "text": "Putting an entire peanut butter and jelly sandwich into the VCR.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1202,
        "cardType": "A",
        "text": "Spending lots of money.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1203,
        "cardType": "A",
        "text": "Some douche with an acoustic guitar.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1204,
        "cardType": "A",
        "text": "Flying robots that kill people.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1205,
        "cardType": "A",
        "text": "A greased-up Matthew McConaughey.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1206,
        "cardType": "A",
        "text": "An unstoppable wave of fire ants.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1207,
        "cardType": "A",
        "text": "Not contributing to society in any meaningful way.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1208,
        "cardType": "A",
        "text": "An all-midget production of Shakespeare's <i>Richard III</i>.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1209,
        "cardType": "A",
        "text": "Screaming like a maniac.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1210,
        "cardType": "A",
        "text": "The moist, demanding chasm of his mouth.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1211,
        "cardType": "A",
        "text": "Filling every orifice with butterscotch pudding.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1212,
        "cardType": "A",
        "text": "Unlimited soup, salad, and breadsticks.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1213,
        "cardType": "A",
        "text": "Crying into the pages of Sylvia Plath.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1214,
        "cardType": "A",
        "text": "Velcro&trade;.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1215,
        "cardType": "A",
        "text": "A PowerPoint presentation.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1216,
        "cardType": "A",
        "text": "A surprising amount of hair.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1217,
        "cardType": "A",
        "text": "Eating Tom Selleck's mustache to gain his powers.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1218,
        "cardType": "A",
        "text": "Roland the Farter, flatulist to the king.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1219,
        "cardType": "A",
        "text": "That ass.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1220,
        "cardType": "A",
        "text": "A pile of squirming bodies.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1221,
        "cardType": "A",
        "text": "Buying the right pants to be cool.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1222,
        "cardType": "A",
        "text": "Blood farts.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1223,
        "cardType": "A",
        "text": "Three months in the hole.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1224,
        "cardType": "A",
        "text": "A botched circumcision.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1225,
        "cardType": "A",
        "text": "The Land of Chocolate.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1226,
        "cardType": "A",
        "text": "Slapping a racist old lady.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1227,
        "cardType": "A",
        "text": "A lamprey swimming up the toilet and latching onto your taint.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1228,
        "cardType": "A",
        "text": "Jumping out at people.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1229,
        "cardType": "A",
        "text": "A black male in his early 20s, last seen wearing a hoodie.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1230,
        "cardType": "A",
        "text": "Mufasa's death scene.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1231,
        "cardType": "A",
        "text": "Bill Clinton, naked on a bearskin rug with a saxophone.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1232,
        "cardType": "A",
        "text": "Demonic possession.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1233,
        "cardType": "A",
        "text": "The Harlem Globetrotters.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1234,
        "cardType": "A",
        "text": "Vomiting mid-blowjob.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1235,
        "cardType": "A",
        "text": "My manservant, Claude.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1236,
        "cardType": "A",
        "text": "Having shotguns for legs.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1237,
        "cardType": "A",
        "text": "Letting everyone down.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1238,
        "cardType": "A",
        "text": "A spontaneous conga line.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1239,
        "cardType": "A",
        "text": "A vagina that leads to another dimension.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1240,
        "cardType": "A",
        "text": "Disco fever.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1241,
        "cardType": "A",
        "text": "Getting your dick stuck in a Chinese finger trap with another dick.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1242,
        "cardType": "A",
        "text": "Fisting.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1243,
        "cardType": "A",
        "text": "The thin veneer of situational causality that underlies porn.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1244,
        "cardType": "A",
        "text": "Girls that always be textin'.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1245,
        "cardType": "A",
        "text": "Blowing some dudes in an alley.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1246,
        "cardType": "A",
        "text": "Drinking ten 5-hour ENERGYs&reg; to get fifty continuous hours of energy.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1247,
        "cardType": "A",
        "text": "Sneezing, farting, and coming at the same time.",
        "numAnswers": 0,
        "expansion": "CAHe3"
    },
    {
        "id": 1248,
        "cardType": "Q",
        "text": "A successful job interview begins with a firm handshake and ends with _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1249,
        "cardType": "Q",
        "text": "Lovin' you is easy 'cause you're _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1250,
        "cardType": "Q",
        "text": "My life is ruled by a vicious cycle of _ and _.",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1251,
        "cardType": "Q",
        "text": "The blind date was going horribly until we discovered our shared interest in _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1252,
        "cardType": "Q",
        "text": "_. Awesome in theory, kind of a mess in practice.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1253,
        "cardType": "Q",
        "text": "I'm not like the rest of you. I'm too rich and busy for _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1254,
        "cardType": "Q",
        "text": "In the seventh circle of Hell, sinners must endure _ for all eternity.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1255,
        "cardType": "Q",
        "text": "_: Hours of fun. Easy to use. Perfect for _!",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1256,
        "cardType": "Q",
        "text": "What left this stain on my couch?",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1257,
        "cardType": "Q",
        "text": "Call the law offices of Goldstein & Goldstein, because no one should have to tolerate _ in the workplace.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1258,
        "cardType": "Q",
        "text": "When you get right down to it, _ is just _.",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1259,
        "cardType": "Q",
        "text": "Turns out that _-Man was neither the hero we needed nor wanted.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1260,
        "cardType": "Q",
        "text": "As part of his daily regimen, Anderson Cooper sets aside 15 minutes for _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1261,
        "cardType": "Q",
        "text": "Money can't buy me love, but it can buy me _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1262,
        "cardType": "Q",
        "text": "With enough time and pressure, _ will turn into _.",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1263,
        "cardType": "Q",
        "text": "And what did you bring for show and tell?",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1264,
        "cardType": "Q",
        "text": "During high school, I never really fit in until I found _ club.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1265,
        "cardType": "Q",
        "text": "Hey, baby, come back to my place and I'll show you _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1266,
        "cardType": "Q",
        "text": "After months of practice with _, I think I'm finally ready for _.",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1267,
        "cardType": "Q",
        "text": "To prepare for his upcoming role, Daniel Day-Lewis immersed himself in the world of _.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1268,
        "cardType": "Q",
        "text": "Finally! A service that delivers _ right to your door.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1269,
        "cardType": "Q",
        "text": "My gym teacher got fired for adding _ to the obstacle course.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1270,
        "cardType": "Q",
        "text": "Having problems with _? Try _!",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1271,
        "cardType": "Q",
        "text": "As part of his contract, Prince won't perform without _ in his dressing room.",
        "numAnswers": 1,
        "expansion": "CAHe3"
    },
    {
        "id": 1272,
        "cardType": "Q",
        "text": "Listen, son. If you want to get involved with _, I won't stop you. Just steer clear of _.",
        "numAnswers": 2,
        "expansion": "CAHe3"
    },
    {
        "id": 1273,
        "cardType": "A",
        "text": "A freshly-filled diaper",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1274,
        "cardType": "A",
        "text": "Glue",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1275,
        "cardType": "A",
        "text": "An unusually-attractive transvestite",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1276,
        "cardType": "A",
        "text": "Hand-me-down adult diapers",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1277,
        "cardType": "A",
        "text": "A stillborn fetus",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1278,
        "cardType": "A",
        "text": "A disgraced pelican",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1279,
        "cardType": "A",
        "text": "Three buckets of urine, free for 2 nights, with no late fee",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1280,
        "cardType": "A",
        "text": "My testicles",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1281,
        "cardType": "A",
        "text": "A black woman's vagina",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1282,
        "cardType": "A",
        "text": "My asshole",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1283,
        "cardType": "A",
        "text": "A whale's blowhole",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1284,
        "cardType": "A",
        "text": "2 Girls 1 Cup",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1285,
        "cardType": "A",
        "text": "The Big Bang Theory (TV)",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1286,
        "cardType": "A",
        "text": "Teen pregnancy",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1287,
        "cardType": "A",
        "text": "Ass hair",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1288,
        "cardType": "A",
        "text": "Vaginal warts",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1289,
        "cardType": "A",
        "text": "Ellen Degeneres",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1290,
        "cardType": "A",
        "text": "Jews Against Humanity",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1291,
        "cardType": "A",
        "text": "Indy wrestling",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1292,
        "cardType": "A",
        "text": "Cunt",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1293,
        "cardType": "A",
        "text": "Beating a crowd of delightful parents to death with a steel dildo",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1294,
        "cardType": "A",
        "text": "Beating a crowd of delightful parents to death with a steel dildo while dressed as Ru Paul's brother, Ron.",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1295,
        "cardType": "A",
        "text": "A roll in the hay",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1296,
        "cardType": "A",
        "text": "\"Get 'em, Steve-Dave!\"",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1297,
        "cardType": "A",
        "text": "God Hates You",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1298,
        "cardType": "A",
        "text": "Manboobs.",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1299,
        "cardType": "A",
        "text": "Daniel Benoit",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1300,
        "cardType": "A",
        "text": "Vomiting in the shower",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1301,
        "cardType": "Q",
        "text": "I just met you and this is crazy, but here's _, so _ maybe",
        "numAnswers": 2,
        "expansion": "Image1"
    },
    {
        "id": 1302,
        "cardType": "Q",
        "text": "It's only _ if you get caught!",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1303,
        "cardType": "Q",
        "text": "_: The Next Generation",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1304,
        "cardType": "Q",
        "text": "Terminator 4: _",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1305,
        "cardType": "Q",
        "text": "Disney presents _ on ice!",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1306,
        "cardType": "Q",
        "text": "_. The other white meat.",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1307,
        "cardType": "Q",
        "text": "A _ a day keeps the _ away.",
        "numAnswers": 2,
        "expansion": "Image1"
    },
    {
        "id": 1308,
        "cardType": "A",
        "text": "An intellectually superior overlord",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1309,
        "cardType": "Q",
        "text": "I'm sweating like a _ at a _.",
        "numAnswers": 2,
        "expansion": "Image1"
    },
    {
        "id": 1310,
        "cardType": "Q",
        "text": "I love the smell of _ in the morning.",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1311,
        "cardType": "Q",
        "text": "You're not gonna believe this, but _.",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1312,
        "cardType": "A",
        "text": "Dwight Schrute",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1313,
        "cardType": "A",
        "text": "Casey Anthony",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1314,
        "cardType": "A",
        "text": "Clubbin seals",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1315,
        "cardType": "A",
        "text": "Stunt cock",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1316,
        "cardType": "Q",
        "text": "_. All the cool kids are doing it.",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1317,
        "cardType": "A",
        "text": "Anal lice",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1318,
        "cardType": "Q",
        "text": "So I was _ in my cubicle at work, and suddenly _!",
        "numAnswers": 2,
        "expansion": "Image1"
    },
    {
        "id": 1319,
        "cardType": "A",
        "text": "Lightsaber Dildos",
        "numAnswers": 0,
        "expansion": "Image1"
    },
    {
        "id": 1320,
        "cardType": "Q",
        "text": "Baskin Robbins just added a 32nd flavor: _!",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1321,
        "cardType": "Q",
        "text": "I can drive and _ at the same time.",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1322,
        "cardType": "Q",
        "text": "_ ain't nothin' to fuck wit'!",
        "numAnswers": 1,
        "expansion": "Image1"
    },
    {
        "id": 1323,
        "cardType": "A",
        "text": "Jaime Lannister, 'The Kingslayer'",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1324,
        "cardType": "A",
        "text": "Cersei Lannister, the Queen",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1325,
        "cardType": "A",
        "text": "Joffrey Baratheon, the Prince",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1326,
        "cardType": "A",
        "text": "Tyrion Lannister, 'The Imp'",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1327,
        "cardType": "A",
        "text": "Ned Stark, Lord of Winterfell, Warden of the North",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1328,
        "cardType": "A",
        "text": "Robb Stark, heir apparent of Winterfell",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1329,
        "cardType": "A",
        "text": "Jon Snow, the bastard",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1330,
        "cardType": "A",
        "text": "Catelyn Stark, Lady of Winterfell",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1331,
        "cardType": "A",
        "text": "Sansa Stark, betrothed to Prince Joffrey",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1332,
        "cardType": "A",
        "text": "Arya Stark",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1333,
        "cardType": "A",
        "text": "Bran Stark",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1334,
        "cardType": "A",
        "text": "Hodor",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1335,
        "cardType": "A",
        "text": "The Wall",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1336,
        "cardType": "A",
        "text": "The Night's Watch",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1337,
        "cardType": "A",
        "text": "Danerys Targaryen, Khaleesi of the Dothraki",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1338,
        "cardType": "A",
        "text": "Theon Greyjoy, Ned Stark's youthful ward",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1339,
        "cardType": "A",
        "text": "Peter 'Littlefinger' Baelish",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1340,
        "cardType": "A",
        "text": "Lord Varys, the Spider",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1341,
        "cardType": "A",
        "text": "King Robert Baratheon, First of His Name, King of the Andals and the First Men, Lord Protector of the Realm",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1342,
        "cardType": "A",
        "text": "Khal Drogo, Dothraki horse lord",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1343,
        "cardType": "A",
        "text": "The Iron Throne",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1344,
        "cardType": "A",
        "text": "HODOR!!",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1345,
        "cardType": "A",
        "text": "Ros, the red-headed whore",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1346,
        "cardType": "A",
        "text": "Winterfell",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1347,
        "cardType": "A",
        "text": "Kings's Landing",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1348,
        "cardType": "A",
        "text": "The North",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1349,
        "cardType": "A",
        "text": "Beyond the Wall",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1350,
        "cardType": "A",
        "text": "Westeros",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1351,
        "cardType": "A",
        "text": "The Seven Kingdoms",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1352,
        "cardType": "A",
        "text": "Direwolves",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1353,
        "cardType": "A",
        "text": "White Walkers",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1354,
        "cardType": "A",
        "text": "Dragons",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1355,
        "cardType": "A",
        "text": "'Winter is Coming'",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1356,
        "cardType": "A",
        "text": "The old gods and the new",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1357,
        "cardType": "A",
        "text": "Incest, hot twin on twin action",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1358,
        "cardType": "A",
        "text": "House Stark",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1359,
        "cardType": "A",
        "text": "House Lannister",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1360,
        "cardType": "A",
        "text": "House Targaryen",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1361,
        "cardType": "A",
        "text": "George R. R. Martin",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1362,
        "cardType": "A",
        "text": "Gratuitous nudity, the way only HBO® can provide",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1363,
        "cardType": "A",
        "text": "Throwing a boy out of a window to cover up incest",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1364,
        "cardType": "A",
        "text": "Joining the Night's Watch",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1365,
        "cardType": "A",
        "text": "Selling your sister to Dothraki nomads",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1366,
        "cardType": "A",
        "text": "Making your husband love you through cunning use of reverse cowgirl",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1367,
        "cardType": "A",
        "text": "Running a whorehouse, which is better than owning ships",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1368,
        "cardType": "A",
        "text": "Conquering the continent with dragons",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1369,
        "cardType": "A",
        "text": "Being forced to marry an abusive king",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1370,
        "cardType": "A",
        "text": "Beheading a man for having no honor",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1371,
        "cardType": "A",
        "text": "Explaining complicated plot with lots of naked women around",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1372,
        "cardType": "A",
        "text": "Trusting Littlefinger",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1373,
        "cardType": "A",
        "text": "Learning the prince is a bastard and the product of incest",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1374,
        "cardType": "A",
        "text": "Slapping Joffrey. Repeatedly.",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1375,
        "cardType": "A",
        "text": "Cutting off your enemies' heads and mounting them on spikes",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1376,
        "cardType": "A",
        "text": "Raising your husband's bastard son as your own",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1377,
        "cardType": "A",
        "text": "Asking a teenage girl if she's 'bled yet'",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1378,
        "cardType": "A",
        "text": "Making millions of fans cry by killing off beloved characters",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1379,
        "cardType": "A",
        "text": "Hodoring",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1380,
        "cardType": "A",
        "text": "Riding off to join your best friend's rebellion",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1381,
        "cardType": "A",
        "text": "Breastfeeding your creepy son until he's 9 years old",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1382,
        "cardType": "A",
        "text": "Having a giant wolf for a pet",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1383,
        "cardType": "A",
        "text": "Beheaded on the steps of the Sept of Baelor",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1384,
        "cardType": "A",
        "text": "Killed by a member of the Kingsguard",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1385,
        "cardType": "A",
        "text": "Seized the Iron Throne by any means necessary",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1386,
        "cardType": "A",
        "text": "Built a 700 foot high wall to keep out bad things",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1387,
        "cardType": "A",
        "text": "Born a bastard",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1388,
        "cardType": "A",
        "text": "Butchered by White Walkers and arranged in an artful pattern",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1389,
        "cardType": "A",
        "text": "Appointed as Hand of the King",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1390,
        "cardType": "A",
        "text": "Found enough wolf cubs for all the children",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1391,
        "cardType": "A",
        "text": "Fondled by your brother on your wedding day",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1392,
        "cardType": "A",
        "text": "Climbed the wrong wall at the wrong time",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1393,
        "cardType": "A",
        "text": "Started a pointless vendetta with another House",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1394,
        "cardType": "A",
        "text": "Increased ratings with the use of gratuitous nudity",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1395,
        "cardType": "A",
        "text": "Carried by Hodor",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1396,
        "cardType": "A",
        "text": "Pissed off of the Wall just because",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1397,
        "cardType": "A",
        "text": "Swore an oath to the old gods and the new",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1398,
        "cardType": "A",
        "text": "Brought home a new baby bastard for your wife to hate",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1399,
        "cardType": "A",
        "text": "Negotiated a wedding no one will like",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1400,
        "cardType": "A",
        "text": "Rode a dragon, like a boss",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1401,
        "cardType": "A",
        "text": "Changed things from the book, infuriating fans",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1402,
        "cardType": "A",
        "text": "Spent an entire reign chasing boars and fucking whores",
        "numAnswers": 0,
        "expansion": "GOT"
    },
    {
        "id": 1403,
        "cardType": "Q",
        "text": "If Ned Stark had _, he never would have _.",
        "numAnswers": 2,
        "expansion": "GOT"
    },
    {
        "id": 1404,
        "cardType": "Q",
        "text": "Brace yourselves, _ is coming.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1405,
        "cardType": "Q",
        "text": "In exchange for his sister, Viserys was given _.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1406,
        "cardType": "Q",
        "text": "Despite his best efforts, King Robert filled his reign with _.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1407,
        "cardType": "Q",
        "text": "_ was proclaimed the true king of the Seven Kingdoms.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1408,
        "cardType": "Q",
        "text": "In _, you win or you lose.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1409,
        "cardType": "Q",
        "text": "Because of _, Danerys was called _ by everyone.",
        "numAnswers": 2,
        "expansion": "GOT"
    },
    {
        "id": 1410,
        "cardType": "Q",
        "text": "I will take what is mine with _ and _.",
        "numAnswers": 2,
        "expansion": "GOT"
    },
    {
        "id": 1411,
        "cardType": "Q",
        "text": "There is no word for _ in Dothraki.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1412,
        "cardType": "Q",
        "text": "In the next Game of Thrones book, George R. R. Martin said _ will _.",
        "numAnswers": 2,
        "expansion": "GOT"
    },
    {
        "id": 1413,
        "cardType": "Q",
        "text": "All hail _! King of _!",
        "numAnswers": 2,
        "expansion": "GOT"
    },
    {
        "id": 1414,
        "cardType": "Q",
        "text": "A Lannister always pays _.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1415,
        "cardType": "Q",
        "text": "First lesson, stick them with _.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1416,
        "cardType": "Q",
        "text": "In the name of _, first of his _.",
        "numAnswers": 2,
        "expansion": "GOT"
    },
    {
        "id": 1417,
        "cardType": "Q",
        "text": "The things I do for _.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1418,
        "cardType": "Q",
        "text": "Hodor only ever says _.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1419,
        "cardType": "Q",
        "text": "The next Game of Thrones book will be titled _ of _.",
        "numAnswers": 2,
        "expansion": "GOT"
    },
    {
        "id": 1420,
        "cardType": "Q",
        "text": "A Dothraki wedding without _ is considered a dull affair.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1421,
        "cardType": "Q",
        "text": "After I was caught _, I was forced to join the Night's Watch.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1422,
        "cardType": "Q",
        "text": "A man without _ is a man without power.",
        "numAnswers": 1,
        "expansion": "GOT"
    },
    {
        "id": 1423,
        "cardType": "A",
        "text": "Full HD.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1424,
        "cardType": "A",
        "text": "The Gravity Gun.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1425,
        "cardType": "A",
        "text": "Reading the comments.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1426,
        "cardType": "A",
        "text": "70,000 gamers sweating and farting inside an airtight steel dome.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1427,
        "cardType": "A",
        "text": "Allowing nacho cheese to curdle in your beard while you creep in League of Legends.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1428,
        "cardType": "A",
        "text": "Achieving the manual dexterity and tactical brilliance of a 12-year-old Korean boy.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1429,
        "cardType": "A",
        "text": "Rolling a D20 to save a failing marriage.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1430,
        "cardType": "A",
        "text": "The collective wail of every Magic player suddenly realizing that they've spent hundreds of dollars on pieces of cardboard.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1431,
        "cardType": "A",
        "text": "Being an attractive elf trapped in an unattractive human's body.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1432,
        "cardType": "A",
        "text": "Temporary invincibility.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1433,
        "cardType": "A",
        "text": "The Sarlacc.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1434,
        "cardType": "A",
        "text": "Filling every pouch of a UtiliKilt&trade; with pizza.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1435,
        "cardType": "A",
        "text": "Bowser's aching heart.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1436,
        "cardType": "A",
        "text": "Mario Kart rage.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1437,
        "cardType": "A",
        "text": "Nude-Modding Super Mario World.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1438,
        "cardType": "A",
        "text": "An angry stone head that stomps on the floor every three seconds.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1439,
        "cardType": "A",
        "text": "Yoshi's huge egg-laying cloaca.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1440,
        "cardType": "A",
        "text": "The Cock Ring of Alacrity.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1441,
        "cardType": "A",
        "text": "Offering sexual favors for an ore and a sheep.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1442,
        "cardType": "A",
        "text": "A home-made, cum-stained Star Trek uniform.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1443,
        "cardType": "A",
        "text": "Unlocking a new sex position.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1444,
        "cardType": "A",
        "text": "The boner hatch in the Iron Man suit.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1445,
        "cardType": "A",
        "text": "Never watching, discussing, or thinking about My Little Pony.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1446,
        "cardType": "A",
        "text": "Turn-of-the-century sky racists.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1447,
        "cardType": "A",
        "text": "The decade of legal inquests following a single hour of Grand Theft Auto.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1448,
        "cardType": "A",
        "text": "A fully-dressed female video game character.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1449,
        "cardType": "A",
        "text": "Buying virtual clothes for a Sim family instead of real clothes for a real family.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1450,
        "cardType": "A",
        "text": "Google Glass + e-Cigarette: Ultimate Combo!",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1451,
        "cardType": "A",
        "text": "Tapping Serra Angel.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1452,
        "cardType": "A",
        "text": "Charles Barkley Shut Up and Jam!",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1453,
        "cardType": "A",
        "text": "Legendary Creature - Robert Khoo.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1454,
        "cardType": "A",
        "text": "Winning the approval of Cooking Mama that you never got from actual mama.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1455,
        "cardType": "A",
        "text": "Eating a pizza that's lying in the street to gain health.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1456,
        "cardType": "A",
        "text": "Getting into a situation with an Owlbear.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1457,
        "cardType": "A",
        "text": "Grand Theft Auto: Fort Lauderdale.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1458,
        "cardType": "A",
        "text": "A madman who lives in a police box and kidnaps women.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1459,
        "cardType": "A",
        "text": "SNES cartridge cleaning fluid.",
        "numAnswers": 0,
        "expansion": "PAXP13"
    },
    {
        "id": 1460,
        "cardType": "Q",
        "text": "The most controversial game at PAX this year is an 8-bit indie platformer about _.",
        "numAnswers": 1,
        "expansion": "PAXP13"
    },
    {
        "id": 1461,
        "cardType": "Q",
        "text": "What made Spock cry?",
        "numAnswers": 1,
        "expansion": "PAXP13"
    },
    {
        "id": 1462,
        "cardType": "Q",
        "text": "_: Achievement unlocked.",
        "numAnswers": 1,
        "expansion": "PAXP13"
    },
    {
        "id": 1463,
        "cardType": "Q",
        "text": "There was a riot at the Gearbox panel when they gave the attendees _.",
        "numAnswers": 1,
        "expansion": "PAXP13"
    },
    {
        "id": 1464,
        "cardType": "Q",
        "text": "In the new DLC for Mass Effect, Shepard must save the galaxy from _.",
        "numAnswers": 1,
        "expansion": "PAXP13"
    },
    {
        "id": 1465,
        "cardType": "Q",
        "text": "What's the latest bullshit that's troubling this quaint fantasy town?",
        "numAnswers": 1,
        "expansion": "PAXP13"
    },
    {
        "id": 1466,
        "cardType": "Q",
        "text": "No Enforcer wants to manage the panel on _.",
        "numAnswers": 1,
        "expansion": "PAXP13"
    },
    {
        "id": 1467,
        "cardType": "A",
        "text": "An immediately regrettable $9 hot dog from the Boston Convention Center.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1468,
        "cardType": "A",
        "text": "Running out of stamina.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1469,
        "cardType": "A",
        "text": "Casting Magic Missile at a bully.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1470,
        "cardType": "A",
        "text": "Getting bitch slapped by Dhalsim.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1471,
        "cardType": "A",
        "text": "Firefly: Season 2.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1472,
        "cardType": "A",
        "text": "Rotating shapes in mid-air so that they fit into other shapes when they fall.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1473,
        "cardType": "A",
        "text": "Jiggle physics.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1474,
        "cardType": "A",
        "text": "Paying the iron price.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1475,
        "cardType": "A",
        "text": "Sharpening a foam broadsword on a foam whetstone.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1476,
        "cardType": "A",
        "text": "The rocket launcher.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1477,
        "cardType": "A",
        "text": "The depression that ensues after catching 'em all.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1478,
        "cardType": "A",
        "text": "Loading from a previous save.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1479,
        "cardType": "A",
        "text": "Violating the first Law of Robotics.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1480,
        "cardType": "A",
        "text": "Getting inside the Horadic Cube with a hot babe and pressing the transmute button.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1481,
        "cardType": "A",
        "text": "Punching a tree to gather wood.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1482,
        "cardType": "A",
        "text": "Spending the year's insulin budget on Warhammer 40k figurines.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1483,
        "cardType": "A",
        "text": "The Klobb.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1484,
        "cardType": "A",
        "text": "Achieving 500 actions per minute.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1485,
        "cardType": "A",
        "text": "Vespene gas.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1486,
        "cardType": "A",
        "text": "Wil Wheaton crashing an actual spaceship.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1487,
        "cardType": "A",
        "text": "Charging up all the way.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1488,
        "cardType": "A",
        "text": "Judging elves by the color of their skin and not the content of their character.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1489,
        "cardType": "A",
        "text": "Smashing all the pottery in a Pottery Barn in search of rupees.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1490,
        "cardType": "A",
        "text": "Forgetting to eat and consequently dying.",
        "numAnswers": 0,
        "expansion": "PAXE13"
    },
    {
        "id": 1491,
        "cardType": "Q",
        "text": "I have an idea even better than Kickstarter, and it's called _starter",
        "numAnswers": 1,
        "expansion": "PAXE13"
    },
    {
        "id": 1492,
        "cardType": "Q",
        "text": "You have been waylaid by _ and must defend yourself.",
        "numAnswers": 1,
        "expansion": "PAXE13"
    },
    {
        "id": 1493,
        "cardType": "Q",
        "text": "In the final round of this year's Omegathon, Omeganauts must face off in a game of _.",
        "numAnswers": 1,
        "expansion": "PAXE13"
    },
    {
        "id": 1494,
        "cardType": "Q",
        "text": "Action stations! Action stations! Set condition one throughout the fleet and brace for _!",
        "numAnswers": 1,
        "expansion": "PAXE13"
    },
    {
        "id": 1495,
        "cardType": "Q",
        "text": "Press &darr;&darr;&larr;&rarr; to unleash _.",
        "numAnswers": 1,
        "expansion": "PAXE13"
    },
    {
        "id": 1496,
        "cardType": "Q",
        "text": "I don't know exactly how I got the PAX plague, but I suspect it had something to do with _.",
        "numAnswers": 1,
        "expansion": "PAXE13"
    },
    {
        "id": 1497,
        "cardType": "A",
        "text": "Zero F**K's Given!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1498,
        "cardType": "A",
        "text": "Windows update",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1499,
        "cardType": "A",
        "text": "Wilfrord Brimley's Mustache",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1500,
        "cardType": "A",
        "text": "Wikileaks",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1501,
        "cardType": "A",
        "text": "Why not Zoidberg?!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1502,
        "cardType": "A",
        "text": "White Shirt",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1503,
        "cardType": "A",
        "text": "Warp core breach",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1504,
        "cardType": "A",
        "text": "W.O.P.R.",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1505,
        "cardType": "A",
        "text": "Vinyl Vanna",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1506,
        "cardType": "A",
        "text": "Vegas 2.0",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1507,
        "cardType": "A",
        "text": "Using 4Chan for parenting advice",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1508,
        "cardType": "A",
        "text": "User Error",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1509,
        "cardType": "A",
        "text": "Undercover NBC DateLine Reporter",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1510,
        "cardType": "A",
        "text": "UDP Handshake",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1511,
        "cardType": "A",
        "text": "Two Girls One Cup",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1512,
        "cardType": "A",
        "text": "Truffle Shuffle",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1513,
        "cardType": "A",
        "text": "Trigger word",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1514,
        "cardType": "A",
        "text": "Tractor Beam",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1515,
        "cardType": "A",
        "text": "Toxic BBQ",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1516,
        "cardType": "A",
        "text": "I'm a text",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1517,
        "cardType": "A",
        "text": "Tongue punch that fart box, boy",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1518,
        "cardType": "A",
        "text": "TL;DR",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1519,
        "cardType": "A",
        "text": "Threat modeling",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1520,
        "cardType": "A",
        "text": "Throat Punching",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1521,
        "cardType": "A",
        "text": "There's talks at DEF CON?",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1522,
        "cardType": "A",
        "text": "The Spanish Inquisition",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1523,
        "cardType": "A",
        "text": "The smell of glitter and lost dreams",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1524,
        "cardType": "A",
        "text": "The plan was to crowd source a plan",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1525,
        "cardType": "A",
        "text": "The fractured elements of her psyche reassembled themselves into an exact likeness of a snarling ferret and she self-destructed",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1526,
        "cardType": "A",
        "text": "The asshole sitting to my right.",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1527,
        "cardType": "A",
        "text": "The asshole sitting to my left",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1528,
        "cardType": "A",
        "text": "That's What ~ She",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1529,
        "cardType": "A",
        "text": "That's Racist!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1530,
        "cardType": "A",
        "text": "That place where I put that thing that time.",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1531,
        "cardType": "A",
        "text": "That just happened and we let that happen.",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1532,
        "cardType": "A",
        "text": "Tentacle Porn",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1533,
        "cardType": "A",
        "text": "TARDIS",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1534,
        "cardType": "A",
        "text": "Sweat, anger and shame",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1535,
        "cardType": "A",
        "text": "Stolen laptops",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1536,
        "cardType": "A",
        "text": "Sticky keyboard",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1537,
        "cardType": "A",
        "text": "Steve Wozniak",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1538,
        "cardType": "A",
        "text": "Steampunk",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1539,
        "cardType": "A",
        "text": "SRDF (Self Righteous Dick Face)",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1540,
        "cardType": "A",
        "text": "Squirrel",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1541,
        "cardType": "A",
        "text": "Spyware",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1542,
        "cardType": "A",
        "text": "Spotting a FED",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1543,
        "cardType": "A",
        "text": "SPAM with Bacon",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1544,
        "cardType": "A",
        "text": "Something something danger zone. I know. I'm not even trying anymore.",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1545,
        "cardType": "A",
        "text": "Spacedicks",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1546,
        "cardType": "A",
        "text": "Slow Clap",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1547,
        "cardType": "A",
        "text": "Six gummy bears and some scotch",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1548,
        "cardType": "A",
        "text": "Situational awareness",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1549,
        "cardType": "A",
        "text": "Shut up and take my money",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1550,
        "cardType": "A",
        "text": "Schrödinger's cat",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1551,
        "cardType": "A",
        "text": "Shenanigans",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1552,
        "cardType": "A",
        "text": "Security theater",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1553,
        "cardType": "A",
        "text": "Security Evangelist",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1554,
        "cardType": "A",
        "text": "Security by obscurity",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1555,
        "cardType": "A",
        "text": "Script kiddies",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1556,
        "cardType": "A",
        "text": "Said no one ever!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1557,
        "cardType": "A",
        "text": "Sabu",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1558,
        "cardType": "A",
        "text": "Running backwards through a corn field",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1559,
        "cardType": "A",
        "text": "Rule 34",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1560,
        "cardType": "A",
        "text": "Ruby on Rails",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1561,
        "cardType": "A",
        "text": "Rolling Natural 20's",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1562,
        "cardType": "A",
        "text": "ROFLCOPTER",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1563,
        "cardType": "A",
        "text": "Riding a horse",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1564,
        "cardType": "A",
        "text": "Ridiculously Photogenic Guy",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1565,
        "cardType": "A",
        "text": "Ribbed for their pleasure",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1566,
        "cardType": "A",
        "text": "Restore from backups",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1567,
        "cardType": "A",
        "text": "Redbull without a cause",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1568,
        "cardType": "A",
        "text": "Red Shirts",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1569,
        "cardType": "A",
        "text": "ReCaptcha",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1570,
        "cardType": "A",
        "text": "Real men of Genius",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1571,
        "cardType": "A",
        "text": "Rainbow tables",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1572,
        "cardType": "A",
        "text": "Rageface",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1573,
        "cardType": "A",
        "text": "Rage quit",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1574,
        "cardType": "A",
        "text": "Put Kevin back",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1575,
        "cardType": "A",
        "text": "Put a bird on it",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1576,
        "cardType": "A",
        "text": "Purchasing challenge coins on eBay",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1577,
        "cardType": "A",
        "text": "Prism",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1578,
        "cardType": "A",
        "text": "Priest in a thong doing the Gangnam Style",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1579,
        "cardType": "A",
        "text": "Pressing the red button",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1580,
        "cardType": "A",
        "text": "Prenda Law",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1581,
        "cardType": "A",
        "text": "Prairie dogging during an interview",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1582,
        "cardType": "A",
        "text": "Practicing Gringo Warrior at home with baby oil. Naked.",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1583,
        "cardType": "A",
        "text": "P0rn",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1584,
        "cardType": "A",
        "text": "PORK CHOP SANDWICHES!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1585,
        "cardType": "A",
        "text": "Pop, Pop, Ret",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1586,
        "cardType": "A",
        "text": "Pool2Girl",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1587,
        "cardType": "A",
        "text": "Please do the needful",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1588,
        "cardType": "A",
        "text": "Pirate Party",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1589,
        "cardType": "A",
        "text": "Pepper spray",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1590,
        "cardType": "A",
        "text": "PedoBear",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1591,
        "cardType": "A",
        "text": "Patrick Star",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1592,
        "cardType": "A",
        "text": "Pastebin password files",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1593,
        "cardType": "A",
        "text": "Passwords emailed in plain text",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1594,
        "cardType": "A",
        "text": "Password: Guest",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1595,
        "cardType": "A",
        "text": "0wning You",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1596,
        "cardType": "A",
        "text": "Online backups",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1597,
        "cardType": "A",
        "text": "One Salty Hash",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1598,
        "cardType": "A",
        "text": "OMGBTFBBQ",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1599,
        "cardType": "A",
        "text": "Obvious",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1600,
        "cardType": "A",
        "text": "NSA",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1601,
        "cardType": "A",
        "text": "Now I'm into something... Darker",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1602,
        "cardType": "A",
        "text": "Not a single fuck was given",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1603,
        "cardType": "A",
        "text": "North Korea's Twitter Account",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1604,
        "cardType": "A",
        "text": "No Starch Press",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1605,
        "cardType": "A",
        "text": "No Reason",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1606,
        "cardType": "A",
        "text": "Nmap",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1607,
        "cardType": "A",
        "text": "Ninjas, Pirates, Robots, and Zombies!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1608,
        "cardType": "A",
        "text": "Ninja badge",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1609,
        "cardType": "A",
        "text": "Nigerian scammers",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1610,
        "cardType": "A",
        "text": "Neck beard",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1611,
        "cardType": "A",
        "text": "NAMBLA",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1612,
        "cardType": "A",
        "text": "Na-ah-ah You didn't say the magic word!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1613,
        "cardType": "A",
        "text": "My sex robot Fisto Roboto",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1614,
        "cardType": "A",
        "text": "My massive SSD",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1615,
        "cardType": "A",
        "text": "My little Bronies",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1616,
        "cardType": "A",
        "text": "My first Prostate Exam",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1617,
        "cardType": "A",
        "text": "Mouth Hugs",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1618,
        "cardType": "A",
        "text": "Mega",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1619,
        "cardType": "A",
        "text": "Mega Upload",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1620,
        "cardType": "A",
        "text": "Math is hard. Lets go shopping!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1621,
        "cardType": "A",
        "text": "Masturbating in a hot tub for a Ninja Badge",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1622,
        "cardType": "A",
        "text": "Mansplaining",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1623,
        "cardType": "A",
        "text": "Maniacally laughing while wearing a monocle",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1624,
        "cardType": "A",
        "text": "Making a sandwich",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1625,
        "cardType": "A",
        "text": "Maintaining the Ballmer Peak",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1626,
        "cardType": "A",
        "text": "Lock picks",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1627,
        "cardType": "A",
        "text": "Level 8 Portal",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1628,
        "cardType": "A",
        "text": "Lemon Party",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1629,
        "cardType": "A",
        "text": "Learning something at Con",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1630,
        "cardType": "A",
        "text": "Lady boner",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1631,
        "cardType": "A",
        "text": "L0pht",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1632,
        "cardType": "A",
        "text": "Keyloggers",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1633,
        "cardType": "A",
        "text": "Kevin Mitnick",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1634,
        "cardType": "A",
        "text": "Kegels",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1635,
        "cardType": "A",
        "text": "Just the Tip",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1636,
        "cardType": "A",
        "text": "Just a sniff",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1637,
        "cardType": "A",
        "text": "Julian Assange",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1638,
        "cardType": "A",
        "text": "John McAfee",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1639,
        "cardType": "A",
        "text": "It's just a bunch of ones and zeros",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1640,
        "cardType": "A",
        "text": "It blended!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1641,
        "cardType": "A",
        "text": "Ingress",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1642,
        "cardType": "A",
        "text": "Infected email attachments",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1643,
        "cardType": "A",
        "text": "In the cloud",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1644,
        "cardType": "A",
        "text": "Implied Situational Consent",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1645,
        "cardType": "A",
        "text": "Ill-tempered sea bass",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1646,
        "cardType": "A",
        "text": "If you know what I mean",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1647,
        "cardType": "A",
        "text": "Identity theft",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1648,
        "cardType": "A",
        "text": "ICANN",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1649,
        "cardType": "A",
        "text": "I should buy a boat",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1650,
        "cardType": "A",
        "text": "Humperdink award",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1651,
        "cardType": "A",
        "text": "HuBot (Chatroom bot)",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1652,
        "cardType": "A",
        "text": "Hookers & Blow",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1653,
        "cardType": "A",
        "text": "Hashtag",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1654,
        "cardType": "A",
        "text": "Handcuffs",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1655,
        "cardType": "A",
        "text": "Grumpy Cat",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1656,
        "cardType": "A",
        "text": "Gray beard, gray balls",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1657,
        "cardType": "A",
        "text": "Grammar Nazi",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1658,
        "cardType": "A",
        "text": "Got it done!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1659,
        "cardType": "A",
        "text": "Good Guy Greg",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1660,
        "cardType": "A",
        "text": "Golf cart",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1661,
        "cardType": "A",
        "text": "Glasshole",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1662,
        "cardType": "A",
        "text": "Getting thrown the the pool by the Goons with all your tech",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1663,
        "cardType": "A",
        "text": "Getting hammered in the ass so much you die of getting hammered in the ass",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1664,
        "cardType": "A",
        "text": "Getting F'd in the A with a D",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1665,
        "cardType": "A",
        "text": "Getting a sympathy boner",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1666,
        "cardType": "A",
        "text": "Fyodor",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1667,
        "cardType": "A",
        "text": "FX",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1668,
        "cardType": "A",
        "text": "Forking someone's repo",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1669,
        "cardType": "A",
        "text": "Forever Alone",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1670,
        "cardType": "A",
        "text": "FOIA Request",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1671,
        "cardType": "A",
        "text": "Floppy Disk",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1672,
        "cardType": "A",
        "text": "Flipping a table",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1673,
        "cardType": "A",
        "text": "Flesh light",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1674,
        "cardType": "A",
        "text": "Flame wars",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1675,
        "cardType": "A",
        "text": "Fist full of assholes",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1676,
        "cardType": "A",
        "text": "Fish fingers and custard",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1677,
        "cardType": "A",
        "text": "First World Problems",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1678,
        "cardType": "A",
        "text": "Finished it last week!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1679,
        "cardType": "A",
        "text": "FemiNazi's",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1680,
        "cardType": "A",
        "text": "Fear Uncertainty Doubt (FUD)",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1681,
        "cardType": "A",
        "text": "Fapping while wearing a horse head mask",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1682,
        "cardType": "A",
        "text": "Fapping on the family computer",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1683,
        "cardType": "A",
        "text": "Fapped",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1684,
        "cardType": "A",
        "text": "Facepalm",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1685,
        "cardType": "A",
        "text": "EXIF data stalking",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1686,
        "cardType": "A",
        "text": "End User License Agreement",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1687,
        "cardType": "A",
        "text": "Electronic Frontier Foundation",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1688,
        "cardType": "A",
        "text": "Edward Snowden",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1689,
        "cardType": "A",
        "text": "Drunken Muppet",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1690,
        "cardType": "A",
        "text": "Drones",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1691,
        "cardType": "A",
        "text": "Double ROT13",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1692,
        "cardType": "A",
        "text": "Double Facepalm",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1693,
        "cardType": "A",
        "text": "Don't Blink",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1694,
        "cardType": "A",
        "text": "Dr. Who",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1695,
        "cardType": "A",
        "text": "Dongs",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1696,
        "cardType": "A",
        "text": "Doing the '(you are) NOT the father' dance",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1697,
        "cardType": "A",
        "text": "Digital Millennium Copyright Act (DMCA)",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1698,
        "cardType": "A",
        "text": "Die in a fire",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1699,
        "cardType": "A",
        "text": "Dick and/or Balls",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1700,
        "cardType": "A",
        "text": "derp.rar (yo.zip)",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1701,
        "cardType": "A",
        "text": "Def Con Wireless",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1702,
        "cardType": "A",
        "text": "Do not connect to this!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1703,
        "cardType": "A",
        "text": "Deep C Phishing",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1704,
        "cardType": "A",
        "text": "Dark Tangent",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1705,
        "cardType": "A",
        "text": "Dan Kaminsky Password Generator",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1706,
        "cardType": "A",
        "text": "Dan Kaminsky",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1707,
        "cardType": "A",
        "text": "Daaaaaanger Zone!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1708,
        "cardType": "A",
        "text": "Cyber war",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1709,
        "cardType": "A",
        "text": "Cyber-douchery",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1710,
        "cardType": "A",
        "text": "Cyber Punk",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1711,
        "cardType": "A",
        "text": "Crying over spilt milk",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1712,
        "cardType": "A",
        "text": "Crash Override",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1713,
        "cardType": "A",
        "text": "Copyright trolls",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1714,
        "cardType": "A",
        "text": "Coding while listening to whale songs",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1715,
        "cardType": "A",
        "text": "Clicking shit",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1716,
        "cardType": "A",
        "text": "Chuck Norris",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1717,
        "cardType": "A",
        "text": "China",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1718,
        "cardType": "A",
        "text": "Check a look at you later",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1719,
        "cardType": "A",
        "text": "Cat memes",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1720,
        "cardType": "A",
        "text": "Caressing a man's hairy chest",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1721,
        "cardType": "A",
        "text": "Captain Crunch (John Draper)",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1722,
        "cardType": "A",
        "text": "Butthurt",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1723,
        "cardType": "A",
        "text": "Butt chugging mom's boxed wine",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1724,
        "cardType": "A",
        "text": "But then I'd have to kill you",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1725,
        "cardType": "A",
        "text": "Big Dongles",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1726,
        "cardType": "A",
        "text": "Big Data",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1727,
        "cardType": "A",
        "text": "Being the big spoon",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1728,
        "cardType": "A",
        "text": "Being the little spoon",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1729,
        "cardType": "A",
        "text": "Being sexually aroused by the sight of TSA's gloves",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1730,
        "cardType": "A",
        "text": "Bath salts",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1731,
        "cardType": "A",
        "text": "Bacon",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1732,
        "cardType": "A",
        "text": "Babe caught me slippin'",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1733,
        "cardType": "A",
        "text": "Awkward mouth hugs",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1734,
        "cardType": "A",
        "text": "Awkward hugs",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1735,
        "cardType": "A",
        "text": "Asymmetric encryption",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1736,
        "cardType": "A",
        "text": "Arbitrary code execution",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1737,
        "cardType": "A",
        "text": "APT1",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1738,
        "cardType": "A",
        "text": "Anonymous",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1739,
        "cardType": "A",
        "text": "And then it died",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1740,
        "cardType": "A",
        "text": "And boom goes the dynamite",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1741,
        "cardType": "A",
        "text": "An arrow to the knee",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1742,
        "cardType": "A",
        "text": "Altair 8800",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1743,
        "cardType": "A",
        "text": "All the Things!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1744,
        "cardType": "A",
        "text": "Alexis Park",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1745,
        "cardType": "A",
        "text": "Ain't nobody got time for dat!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1746,
        "cardType": "A",
        "text": "Ada Initiative approved flesh-light with anti-rape condom included!",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1747,
        "cardType": "A",
        "text": "ACTII pr0n",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1748,
        "cardType": "A",
        "text": "A van down by the river",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1749,
        "cardType": "A",
        "text": "A town with no ducks",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1750,
        "cardType": "A",
        "text": "A series of explicit Post-It notes",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1751,
        "cardType": "A",
        "text": "A series of tubes",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1752,
        "cardType": "A",
        "text": "A Raspberry Pi",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1753,
        "cardType": "A",
        "text": "A Payphone",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1754,
        "cardType": "A",
        "text": "A Ninja-tel Phone",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1755,
        "cardType": "A",
        "text": "A Hak5 Pineapple",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1756,
        "cardType": "A",
        "text": "A Googly eyed blow job",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1757,
        "cardType": "A",
        "text": "A giant cup of STFU",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1758,
        "cardType": "A",
        "text": "A fake ID made from Kinko's",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1759,
        "cardType": "A",
        "text": "A baby's arm holding an apple",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1760,
        "cardType": "A",
        "text": "A 'Pair of Docs'",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1761,
        "cardType": "A",
        "text": "64 Bit Keys",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1762,
        "cardType": "A",
        "text": "503 Card Unavailable",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1763,
        "cardType": "A",
        "text": "501 Card Error",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1764,
        "cardType": "A",
        "text": "500 internal card error",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1765,
        "cardType": "A",
        "text": "406 Not Allowed",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1766,
        "cardType": "A",
        "text": "404 Not Found",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1767,
        "cardType": "A",
        "text": "403 Forbidden",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1768,
        "cardType": "A",
        "text": "401 Unauthorized",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1769,
        "cardType": "A",
        "text": "3D printed P0rn",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1770,
        "cardType": "A",
        "text": "302 Card Redirect",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1771,
        "cardType": "A",
        "text": "10,000 Canadian Pennies",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1772,
        "cardType": "A",
        "text": "1.21 Jigawatts",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1773,
        "cardType": "A",
        "text": "(wub) (wub) (wub)",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1774,
        "cardType": "A",
        "text": "'I Survived Ada Camp' Challenge Coin",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1775,
        "cardType": "A",
        "text": "1337 Sp3ak",
        "numAnswers": 0,
        "expansion": "HACK"
    },
    {
        "id": 1776,
        "cardType": "Q",
        "text": "/r/ _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1777,
        "cardType": "Q",
        "text": "The Ada Initiative is now attacking _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1778,
        "cardType": "Q",
        "text": "Not another _ in the hotel elevator!",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1779,
        "cardType": "Q",
        "text": "Closing Ceremonies drinking game: Every time _ is mentioned... DRINK!",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1780,
        "cardType": "Q",
        "text": "In a Congressional hearing, US CYBERCOM commander Gen. Alexander claimed the latest data breach was due to _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1781,
        "cardType": "Q",
        "text": "The Maker Faire was unexpectedly interrupted by _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1782,
        "cardType": "Q",
        "text": "Do you even _?",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1783,
        "cardType": "Q",
        "text": "Come to the dark side, we have _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1784,
        "cardType": "Q",
        "text": "Y U NO _!!!!!",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1785,
        "cardType": "Q",
        "text": "While alone in the server room I _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1786,
        "cardType": "Q",
        "text": "When I get drunk I am an expert on _",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1787,
        "cardType": "Q",
        "text": "Well, guess what? I’ve got a fever, and the only prescription is more _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1788,
        "cardType": "Q",
        "text": "We should take _ and push it _.",
        "numAnswers": 2,
        "expansion": "HACK"
    },
    {
        "id": 1789,
        "cardType": "Q",
        "text": "We decided to _ to raise money for the EFF.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1790,
        "cardType": "Q",
        "text": "TSA wouldn't allow me through because of my _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1791,
        "cardType": "Q",
        "text": "Tonight's Final Hacker Jeopardy category will be _!",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1792,
        "cardType": "Q",
        "text": "Today's PaulDotCom podcast featured _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1793,
        "cardType": "Q",
        "text": "These are not the _ you are looking for.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1794,
        "cardType": "Q",
        "text": "The snozberries taste like _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1795,
        "cardType": "Q",
        "text": "The only winning move is to _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1796,
        "cardType": "Q",
        "text": "The next cyber war will feature _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1797,
        "cardType": "Q",
        "text": "The best part of Alexis Park was all the _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1798,
        "cardType": "Q",
        "text": "So long and thanks for all the _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1799,
        "cardType": "Q",
        "text": "Security through obscurity is better than _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1800,
        "cardType": "Q",
        "text": "Rule 34 _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1801,
        "cardType": "Q",
        "text": "Rock, Paper, Scissors, Lizard, _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1802,
        "cardType": "Q",
        "text": "Our most powerful weapon for the Zombie Apocalypse will be _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1803,
        "cardType": "Q",
        "text": "Only half of programming is coding. The other 90% is _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1804,
        "cardType": "Q",
        "text": "One does not simply _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1805,
        "cardType": "Q",
        "text": "On the Internet, no one can tell you're _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1806,
        "cardType": "Q",
        "text": "Occupy _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1807,
        "cardType": "Q",
        "text": "Next year's scavenger hunt is rumored to include finding a _ with a _.",
        "numAnswers": 2,
        "expansion": "HACK"
    },
    {
        "id": 1808,
        "cardType": "Q",
        "text": "Next time we meet we should _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1809,
        "cardType": "Q",
        "text": "My extremely large _ is what makes me better than you.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1810,
        "cardType": "Q",
        "text": "My _ brings all the _ to the yard.",
        "numAnswers": 2,
        "expansion": "HACK"
    },
    {
        "id": 1811,
        "cardType": "Q",
        "text": "Most hackers smell like _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1812,
        "cardType": "Q",
        "text": "Las Vegas is best known for _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1813,
        "cardType": "Q",
        "text": "Keep calm and _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1814,
        "cardType": "Q",
        "text": "It's dangerous to go alone. Take _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1815,
        "cardType": "Q",
        "text": "It smells like _ in this room.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1816,
        "cardType": "Q",
        "text": "In a shocking move Archive.org decided to NOT back up _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1817,
        "cardType": "Q",
        "text": "I'mma let you finish but _ is the best _ of all time.",
        "numAnswers": 2,
        "expansion": "HACK"
    },
    {
        "id": 1818,
        "cardType": "Q",
        "text": "I'm fucking tired of hearing about _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1819,
        "cardType": "Q",
        "text": "I would be doing more with my life, except for this _ in the way.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1820,
        "cardType": "Q",
        "text": "I work 80 hours a week and still can't afford a _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1821,
        "cardType": "Q",
        "text": "I used to be a hacker like you, until I took a(n) _ to the knee.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1822,
        "cardType": "Q",
        "text": "I use _ to secure all of my personal data.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1823,
        "cardType": "Q",
        "text": "I spotted the fed and all I got was _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1824,
        "cardType": "Q",
        "text": "I look like a geeky hacker, but I don't know anything about _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1825,
        "cardType": "Q",
        "text": "I have the biggest _, ever!",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1826,
        "cardType": "Q",
        "text": "I find your lack of _ disturbing.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1827,
        "cardType": "Q",
        "text": "I can't believe they rejected my talk on _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1828,
        "cardType": "Q",
        "text": "I can haz _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1829,
        "cardType": "Q",
        "text": "HOLY _ BATMAN!!",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1830,
        "cardType": "Q",
        "text": "High Tech start-up company combines _ with _.",
        "numAnswers": 2,
        "expansion": "HACK"
    },
    {
        "id": 1831,
        "cardType": "Q",
        "text": "Go home _, you're drunk.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1832,
        "cardType": "Q",
        "text": "Go Go Gadget _!",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1833,
        "cardType": "Q",
        "text": "Drink all the _. Hack all the _.",
        "numAnswers": 2,
        "expansion": "HACK"
    },
    {
        "id": 1834,
        "cardType": "Q",
        "text": "Def Con Kids will now focus on teaching young hackers _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1835,
        "cardType": "Q",
        "text": "Confession Bear Says: _",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1836,
        "cardType": "Q",
        "text": "But does _ run NetBSD?",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1837,
        "cardType": "Q",
        "text": "Am I the only one around here who _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1838,
        "cardType": "Q",
        "text": "All I did was _ but someone gave me a red card.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1839,
        "cardType": "Q",
        "text": "35% of all hackers have to deal with _.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1840,
        "cardType": "Q",
        "text": "_. There's an app for that.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1841,
        "cardType": "Q",
        "text": "_. This is why I can't have nice things!",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1842,
        "cardType": "Q",
        "text": "_: You keep using that term. I do not think it means what you think it means.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1843,
        "cardType": "Q",
        "text": "_ is now outsourced to call centers in India.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1844,
        "cardType": "Q",
        "text": "_ shot first.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1845,
        "cardType": "Q",
        "text": "_ Killed the barrel roll",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1846,
        "cardType": "Q",
        "text": "_ A'int Nobody Got Time For Dat!!",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1847,
        "cardType": "Q",
        "text": "_ Put a bird on it!",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1848,
        "cardType": "Q",
        "text": "_ makes me puke rainbows.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1849,
        "cardType": "Q",
        "text": "_ is also monitored by Prism.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1850,
        "cardType": "Q",
        "text": "_ is what keeps us together.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1851,
        "cardType": "Q",
        "text": "_ is a better replacement for crypto.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1852,
        "cardType": "Q",
        "text": "_ riding a Segway",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1853,
        "cardType": "Q",
        "text": "One day, over my fireplace, I'm going to have a massive painting of _. You know, to remind me where I came from.",
        "numAnswers": 1,
        "expansion": "HACK"
    },
    {
        "id": 1854,
        "cardType": "A",
        "text": "10 Incredible Facts About the Anus.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1855,
        "cardType": "A",
        "text": "A Native American who solves crimes by going into the spirit world.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1856,
        "cardType": "A",
        "text": "A Ugandan warlord.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1857,
        "cardType": "A",
        "text": "A bunch of idiots playing a card game instead of interacting like normal humans.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1858,
        "cardType": "A",
        "text": "A dance move that's just sex.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1859,
        "cardType": "A",
        "text": "A fart.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1860,
        "cardType": "A",
        "text": "A for-real lizard that spits blood from its eyes.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1861,
        "cardType": "A",
        "text": "A gender identity that can only be conveyed through slam poetry.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1862,
        "cardType": "A",
        "text": "A hopeless amount of spiders.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1863,
        "cardType": "A",
        "text": "A horse with no legs.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1864,
        "cardType": "A",
        "text": "A kiss on the lips.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1865,
        "cardType": "A",
        "text": "A manhole.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1866,
        "cardType": "A",
        "text": "A sex comet from Neptune that plunges the Earth into eternal sexiness.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1867,
        "cardType": "A",
        "text": "A sex goblin with a carnival penis.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1868,
        "cardType": "A",
        "text": "A shiny rock that proves I love you.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1869,
        "cardType": "A",
        "text": "Actual mutants with medical conditions and no superpowers.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1870,
        "cardType": "A",
        "text": "Africa.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1871,
        "cardType": "A",
        "text": "All the single ladies.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1872,
        "cardType": "A",
        "text": "Almost giving money to a homeless person.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1873,
        "cardType": "A",
        "text": "Ambiguous sarcasm.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1874,
        "cardType": "A",
        "text": "An interracial handshake.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1875,
        "cardType": "A",
        "text": "Angelheaded hipsters burning for the ancient heavenly connection to the starry dynamo in the machinery of night.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1876,
        "cardType": "A",
        "text": "Ass to mouth.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1877,
        "cardType": "A",
        "text": "Blackula.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1878,
        "cardType": "A",
        "text": "Bouncing up and down.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1879,
        "cardType": "A",
        "text": "Calculating every mannerism so as not to suggest homosexuality.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1880,
        "cardType": "A",
        "text": "Child Protective Services.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1881,
        "cardType": "A",
        "text": "Crazy opium eyes.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1882,
        "cardType": "A",
        "text": "Dem titties.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1883,
        "cardType": "A",
        "text": "Depression.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1884,
        "cardType": "A",
        "text": "Doo-doo.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1885,
        "cardType": "A",
        "text": "Drinking responsibly.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1886,
        "cardType": "A",
        "text": "Exploding pigeons.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1887,
        "cardType": "A",
        "text": "Falling into the toilet.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1888,
        "cardType": "A",
        "text": "Finally finishing off the Indians.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1889,
        "cardType": "A",
        "text": "Fucking a corpse back to life.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1890,
        "cardType": "A",
        "text": "Grammar nazis who are also regular Nazis.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1891,
        "cardType": "A",
        "text": "How awesome I am.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1892,
        "cardType": "A",
        "text": "Injecting speed into one arm and horse tranquilizer into the other.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1893,
        "cardType": "A",
        "text": "Interspecies marriage.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1894,
        "cardType": "A",
        "text": "Jizz.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1895,
        "cardType": "A",
        "text": "Khakis.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1896,
        "cardType": "A",
        "text": "Lots and lots of abortions.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1897,
        "cardType": "A",
        "text": "Moderate-to-severe joint pain.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1898,
        "cardType": "A",
        "text": "My dad's dumb fucking face.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1899,
        "cardType": "A",
        "text": "My sex dungeon.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1900,
        "cardType": "A",
        "text": "My worthless son.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1901,
        "cardType": "A",
        "text": "Neil Diamond's Greatest Hits.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1902,
        "cardType": "A",
        "text": "No clothes on, penis in vagina.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1903,
        "cardType": "A",
        "text": "Party Mexicans.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1904,
        "cardType": "A",
        "text": "Prince Ali, fabulous he, Ali Ababwa.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1905,
        "cardType": "A",
        "text": "Sharks with legs.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1906,
        "cardType": "A",
        "text": "Smoking crack, for instance.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1907,
        "cardType": "A",
        "text": "Snorting coke off a clown's boner.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1908,
        "cardType": "A",
        "text": "Some sort of Asian.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1909,
        "cardType": "A",
        "text": "Sports.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1910,
        "cardType": "A",
        "text": "Stuffing a child's face with Fun Dip® until he starts having fun.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1911,
        "cardType": "A",
        "text": "Sugar madness.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1912,
        "cardType": "A",
        "text": "The complex geopolitical quagmire that is the Middle East.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1913,
        "cardType": "A",
        "text": "The euphoric rush of strangling a drifter.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1914,
        "cardType": "A",
        "text": "The peaceful and nonthreatening rise of China.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1915,
        "cardType": "A",
        "text": "The safe word.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1916,
        "cardType": "A",
        "text": "The secret formula for ultimate female satisfaction.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1917,
        "cardType": "A",
        "text": "The size of my penis.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1918,
        "cardType": "A",
        "text": "The tiniest shred of evidence that God is real.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1919,
        "cardType": "A",
        "text": "Three consecutive seconds of happiness.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1920,
        "cardType": "A",
        "text": "Unquestioning obedience.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1921,
        "cardType": "A",
        "text": "What Jesus would do.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1922,
        "cardType": "A",
        "text": "Whatever a McRib® is made of.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1923,
        "cardType": "A",
        "text": "Whispering all sexy.",
        "numAnswers": 0,
        "expansion": "CAHe4"
    },
    {
        "id": 1924,
        "cardType": "Q",
        "text": "2 AM in the city that never sleeps. The door swings open and she walks in, legs up to here. Something in her eyes tells me she's looking for _.",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1925,
        "cardType": "Q",
        "text": "Adventure. Romance. _. From Paramount Pictures, \"_.\"",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1926,
        "cardType": "Q",
        "text": "Alright, bros. Our frat house is condemned, and all the hot slampieces are over at Gamma Phi. The time has come to commence Operation _.",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1927,
        "cardType": "Q",
        "text": "As king, how will I keep the peasants in line?",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1928,
        "cardType": "Q",
        "text": "Dear Leader Kim Jong-un, our village praises your infinite wisdom with a humble offering of _.",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1929,
        "cardType": "Q",
        "text": "Do not fuck with me! I am literally _ right now.",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1930,
        "cardType": "Q",
        "text": "Every step towards _ gets me a little bit closer to _.",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1931,
        "cardType": "Q",
        "text": "Forget everything you know about _, because now we've supercharged it with _!",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1932,
        "cardType": "Q",
        "text": "Honey, I have a new role-play I want to try tonight! You can be _, and I'll be _.",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1933,
        "cardType": "Q",
        "text": "How am I compensating for my tiny penis?",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1934,
        "cardType": "Q",
        "text": "I am become _, destroyer of _!",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1935,
        "cardType": "Q",
        "text": "I'm pretty sure I'm high right now, because I'm absolutely mesmerized by _.",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1936,
        "cardType": "Q",
        "text": "I'm sorry sir, but we don't allow _ at the country club.",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1937,
        "cardType": "Q",
        "text": "If you can't handle _, you'd better stay away from _.",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1938,
        "cardType": "Q",
        "text": "In return for my soul, the Devil promised me _ but all I got was _.",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1939,
        "cardType": "Q",
        "text": "In the beginning there was _. And the Lord said, \"Let there be _.\"",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1940,
        "cardType": "Q",
        "text": "It lurks in the night. It hungers for flesh. This summer, no one is safe from _.",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1941,
        "cardType": "Q",
        "text": "Man, this is bullshit. Fuck _.",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1942,
        "cardType": "Q",
        "text": "Oprah's book of the month is \"_ For _: A Story of Hope\"",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1943,
        "cardType": "Q",
        "text": "She's up all night for good fun. I'm up all night for _.",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1944,
        "cardType": "Q",
        "text": "The Japanese have developed a smaller, more efficient version of _.",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1945,
        "cardType": "Q",
        "text": "This is the prime of my life. I'm young, hot, and full of _.",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1946,
        "cardType": "Q",
        "text": "This year's hottest album is \"_\" by _.",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1947,
        "cardType": "Q",
        "text": "We never did find _, but along the way we sure learned a lot about _.",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1948,
        "cardType": "Q",
        "text": "Wes Anderson's new film tells the story of a precocious child coming to terms with _.",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1949,
        "cardType": "Q",
        "text": "What's fun until it gets weird?",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1950,
        "cardType": "Q",
        "text": "You've seen the bearded lady! You've seen the ring of fire! Now, ladies and gentlemen, feast your eyes upon _!",
        "numAnswers": 1,
        "expansion": "CAHe4"
    },
    {
        "id": 1951,
        "cardType": "Q",
        "text": "_ may pass, but _ will last forever.",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1952,
        "cardType": "Q",
        "text": "_ will never be the same after _.",
        "numAnswers": 2,
        "expansion": "CAHe4"
    },
    {
        "id": 1953,
        "cardType": "Q",
        "text": "You guys, I saw this crazy movie last night. It opens on _, and then there's some stuff about _, and then it ends with _.",
        "numAnswers": 3,
        "expansion": "CAHe4"
    },
    {
        "id": 1954,
        "cardType": "A",
        "text": "The biggest, blackest dick.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1955,
        "cardType": "A",
        "text": "A box.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1956,
        "cardType": "A",
        "text": "A box within a box.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1957,
        "cardType": "A",
        "text": "A boxing match with a giant box.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1958,
        "cardType": "A",
        "text": "A box of biscuits, a box of mixed biscuits, and a biscuit mixer.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1959,
        "cardType": "A",
        "text": "An outbreak of smallbox.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1960,
        "cardType": "A",
        "text": "The Boxcar Children.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1961,
        "cardType": "A",
        "text": "A world without boxes.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1962,
        "cardType": "A",
        "text": "Boxing up my feelings.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1963,
        "cardType": "A",
        "text": "A box-shaped man.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1964,
        "cardType": "A",
        "text": "A man-shaped box.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1965,
        "cardType": "A",
        "text": "Something that looks like a box but turns out to be a crate.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1966,
        "cardType": "A",
        "text": "A box that is conscious and wishes it weren't a box.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1967,
        "cardType": "A",
        "text": "An alternate universe in which boxes store things inside of people.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1968,
        "cardType": "A",
        "text": "The J15 Patriot Assault Box.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1969,
        "cardType": "A",
        "text": "A box without hinges, key, or lid, yet golden treasure inside is hid.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1970,
        "cardType": "A",
        "text": "Two midgets shitting into a box.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1971,
        "cardType": "A",
        "text": "A falcon with a box on its head.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1972,
        "cardType": "A",
        "text": "Being a motherfucking box.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1973,
        "cardType": "A",
        "text": "Former President George W. Box.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1974,
        "cardType": "A",
        "text": "Pandora's vagina.",
        "numAnswers": 0,
        "expansion": "Box"
    },
    {
        "id": 1975,
        "cardType": "A",
        "text": "Tom Baker, in nothing but a scarf.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1976,
        "cardType": "A",
        "text": "Walking in on Jack Harkness doing your mom. And your dad.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1977,
        "cardType": "A",
        "text": "The buzzing noise that the Sonic Screwdriver makes.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1978,
        "cardType": "A",
        "text": "Sharing a public restroom with a weeping angel.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1979,
        "cardType": "A",
        "text": "Just now realizing that \"Torchwood\" is an anagram of \"Doctor Who\".",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1980,
        "cardType": "A",
        "text": "Fifty years of fanfic.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1981,
        "cardType": "A",
        "text": "Wanting to punch that teeny-bopper Whovian that's butthurt the new Doctor isn't in his twenties.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1982,
        "cardType": "A",
        "text": "The Doctor going back in time to solve a REAL problem: \"Twilight\".",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1983,
        "cardType": "A",
        "text": "A \"Doctor Who\" body pillow.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1984,
        "cardType": "A",
        "text": "The Silence.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1985,
        "cardType": "A",
        "text": "A Rusty Cyberman.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1986,
        "cardType": "A",
        "text": "The Doctor having a chance encounter with a couple of 80s metalheads.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1987,
        "cardType": "A",
        "text": "Drunkenly drawing tally marks on your face.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1988,
        "cardType": "A",
        "text": "A shitty Doctor Who knock-knock joke.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1989,
        "cardType": "A",
        "text": "Davros getting up on the wrong side of the bed.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1990,
        "cardType": "A",
        "text": "The Master, baiting the doctor into a trap.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1991,
        "cardType": "A",
        "text": "A Vashta Nerada that just wants a hug.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1992,
        "cardType": "A",
        "text": "Wishing you could regenerate.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1993,
        "cardType": "A",
        "text": "Kidnapping a barely-legal woman to time travel with.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1994,
        "cardType": "A",
        "text": "Getting so much plastic surgery, you have to be framed and moisturized.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1995,
        "cardType": "A",
        "text": "Quitting this panel after one round, because you are afraid of getting typecast.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1996,
        "cardType": "A",
        "text": "The poor costume decisions that were made in the 1970s.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1997,
        "cardType": "A",
        "text": "The Mary Jane Adventures.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1998,
        "cardType": "A",
        "text": "Fondling a Dalek's slippery bits.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 1999,
        "cardType": "A",
        "text": "Sixteen feet of scarf bondage.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2000,
        "cardType": "A",
        "text": "Air from my lungs.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2001,
        "cardType": "A",
        "text": "Smoking 1000 cigarettes, just so you can sound like a Dalek when you talk.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2002,
        "cardType": "A",
        "text": "Giving her the ol' plastic Mickey.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2003,
        "cardType": "A",
        "text": "Companion Porn.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2004,
        "cardType": "A",
        "text": "An acid rain shower on Skaro.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2005,
        "cardType": "A",
        "text": "Pointing to your crotch and saying \"Allons-y\".",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2006,
        "cardType": "A",
        "text": "A sonic screwdriver stuck on the vibrate setting.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2007,
        "cardType": "A",
        "text": "Pouting in a rain storm and having to take a wicked piss.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2008,
        "cardType": "A",
        "text": "The poor decision that is having a staring contest with a weeping angel.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2009,
        "cardType": "A",
        "text": "Sorry, this answer is only available in the fanfic version of Cards Against Con.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2010,
        "cardType": "A",
        "text": "Plot holes so wide, you could drive a truck through them.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2011,
        "cardType": "A",
        "text": "A blinged-out TARDIS, blasting dubstep when it is travelling.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2012,
        "cardType": "A",
        "text": "Rose Tyler's teeth.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2013,
        "cardType": "A",
        "text": "The Master singing \"Bad Case of Loving You.\"",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2014,
        "cardType": "A",
        "text": "Steven Moffat taking a big old dump in your Cheerios.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2015,
        "cardType": "A",
        "text": "K-9 humping your leg.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2016,
        "cardType": "A",
        "text": "A bigger, bluer TARDIS.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2017,
        "cardType": "A",
        "text": "Robot Anne Robinson.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2018,
        "cardType": "A",
        "text": "A fez caked with semen.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2019,
        "cardType": "A",
        "text": "A GUITARDIS",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2020,
        "cardType": "A",
        "text": "The Celestial Toymaker's \"plaything\".",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2021,
        "cardType": "A",
        "text": "Captain Jack Harkness.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2022,
        "cardType": "A",
        "text": "A furry writing BAD WOLF everywhere.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2023,
        "cardType": "A",
        "text": "Your dyslexic friend that wants you to come watch a marathon of \"Doctor How\".",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2024,
        "cardType": "A",
        "text": "Fapping to Billie Piper portraying a callgirl.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2025,
        "cardType": "A",
        "text": "Being used as a plot device by Steven Moffat.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2026,
        "cardType": "A",
        "text": "A Costco-sized bag of Jelly Babies.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2027,
        "cardType": "A",
        "text": "A global simulcast that forces Whovians to see sunlight for the first time in ages.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2028,
        "cardType": "A",
        "text": "THE END OF TIME ITSELF!",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2029,
        "cardType": "A",
        "text": "Finding Autons oddly attractive.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2030,
        "cardType": "A",
        "text": "The fuck machine dungeon of the Cybermen.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2031,
        "cardType": "A",
        "text": "Glenn Beck convulsively puking as a brood of Daleks swarm in on him.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2032,
        "cardType": "A",
        "text": "River Song.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2033,
        "cardType": "A",
        "text": "Low-budget special effects.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2034,
        "cardType": "A",
        "text": "Eggs.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2035,
        "cardType": "A",
        "text": "Dalek porn.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2036,
        "cardType": "A",
        "text": "Taking a Doctor Poo.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2037,
        "cardType": "A",
        "text": "The big banana in your pocket.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2038,
        "cardType": "A",
        "text": "Opening the door of the TARDIS and leaving a deuce in the time-space continuum.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2039,
        "cardType": "A",
        "text": "David Tennant.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2040,
        "cardType": "A",
        "text": "Matt Smith.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2041,
        "cardType": "A",
        "text": "Chistopher Eccleston.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2042,
        "cardType": "A",
        "text": "Siltheen farts.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2043,
        "cardType": "A",
        "text": "A kid in a gas mask asking if you are his mummy.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2044,
        "cardType": "A",
        "text": "Fish fingering your custard.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2045,
        "cardType": "A",
        "text": "The hideousness that is Raxacoricofallapatorious.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2046,
        "cardType": "A",
        "text": "An Ood getting a starring role in a hentai.",
        "numAnswers": 0,
        "expansion": "Gallifrey"
    },
    {
        "id": 2047,
        "cardType": "Q",
        "text": "They found some more lost episodes! They were found in _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2048,
        "cardType": "Q",
        "text": "The Doctor did it! He saved the world again! This time using a _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2049,
        "cardType": "Q",
        "text": "_ was sent to save _.",
        "numAnswers": 2,
        "expansion": "Gallifrey"
    },
    {
        "id": 2050,
        "cardType": "Q",
        "text": "I'd give up _ to travel with The Doctor.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2051,
        "cardType": "Q",
        "text": "The next Doctor Who spin-off is going to be called _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2052,
        "cardType": "Q",
        "text": "Who should be the 13th doctor?",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2053,
        "cardType": "Q",
        "text": "The Chameleon circuit is working again... somewhat. Instead of a phone booth, the TARDIS is now a _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2054,
        "cardType": "Q",
        "text": "Originally, the 50th anniversary special was going to have _ appear, but the BBC decided against it in the end.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2055,
        "cardType": "Q",
        "text": "After we watch an episode, I've got some _-flavored Jelly Babies to hand out.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2056,
        "cardType": "Q",
        "text": "Wibbly-wobbly timey-wimey _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2057,
        "cardType": "Q",
        "text": "What's going to be The Doctor's new catch phrase.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2058,
        "cardType": "Q",
        "text": "Bowties are _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2059,
        "cardType": "Q",
        "text": "The voice chip of one of the Cybermen has malfunctioned. Instead of saying \"DELETE!\", it now says \"_\".",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2060,
        "cardType": "Q",
        "text": "Old and busted: \"EXTERMINATE!\" New hotness: _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2061,
        "cardType": "Q",
        "text": "There's a new dance on Gallifrey, it's called the _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2062,
        "cardType": "Q",
        "text": "They announced a LEGO Doctor Who game! Rumor has it that _ is an unlockable character.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2063,
        "cardType": "Q",
        "text": "FUN FACT: The Daleks were originally shaped to look like _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2064,
        "cardType": "Q",
        "text": "At this new Doctor Who themed restaurant, you can get a free _ if you can eat a plate of bangers and mash in under 3 minutes.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2065,
        "cardType": "Q",
        "text": "According to the Daleks, _ is better at _.",
        "numAnswers": 2,
        "expansion": "Gallifrey"
    },
    {
        "id": 2066,
        "cardType": "Q",
        "text": "Who is going to be The Doctor's next companion?",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2067,
        "cardType": "Q",
        "text": "I think the BBC is losing it. They just released a Doctor Who-themed _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2068,
        "cardType": "Q",
        "text": "It's a little-known fact that if you send a _ to the BBC, they will send you a picture of The Doctor.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2069,
        "cardType": "Q",
        "text": "I was okay with all the BAD WOLF graffiti, until someone wrote it on _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2070,
        "cardType": "Q",
        "text": "Jack Harkness, I can't leave you alone for a minute! I turn around and you're trying to seduce _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2071,
        "cardType": "Q",
        "text": "In all of time and space, you decide that _ is a good choice?!",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2072,
        "cardType": "Q",
        "text": "Adipose were thought to be made of fat, but are really made of _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2073,
        "cardType": "Q",
        "text": "I hear the next thing that will cause The Doctor to regenerate is _.",
        "numAnswers": 1,
        "expansion": "Gallifrey"
    },
    {
        "id": 2074,
        "cardType": "A",
        "text": "… . .-. . -. .. - -.—  (Serenity)",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2075,
        "cardType": "A",
        "text": "'Rails with pails.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2076,
        "cardType": "A",
        "text": "\"Apple Juice.\"",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2077,
        "cardType": "A",
        "text": "A bull penis cane.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2078,
        "cardType": "A",
        "text": "A chip in your heart that forces you to love.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2079,
        "cardType": "A",
        "text": "A dead Ms. Paint.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2080,
        "cardType": "A",
        "text": "A dominant Kankri.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2081,
        "cardType": "A",
        "text": "A five minute video of Cronus giving Kankri a blowjob.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2082,
        "cardType": "A",
        "text": "A mighty wwizard of wwhite science.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2083,
        "cardType": "A",
        "text": "A Nicolas Cage body pillow.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2084,
        "cardType": "A",
        "text": "A painting of a horse attacking a football player.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2085,
        "cardType": "A",
        "text": "A rapist cuttlefish.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2086,
        "cardType": "A",
        "text": "A slaughtered sperm whale.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2087,
        "cardType": "A",
        "text": "A smuppet in Dirk’s pants.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2088,
        "cardType": "A",
        "text": "A Strider sandwich.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2089,
        "cardType": "A",
        "text": "A VrisKan waffle.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2090,
        "cardType": "A",
        "text": "Accidentally touching Gamze’s enormous codpiece.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2091,
        "cardType": "A",
        "text": "Actual blind people who cosplay Terezi.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2092,
        "cardType": "A",
        "text": "Alternian fine art.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2093,
        "cardType": "A",
        "text": "Alternian rainbow-drinker romance novels.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2094,
        "cardType": "A",
        "text": "An acrobatic fucking pirouette.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2095,
        "cardType": "A",
        "text": "Andrew Hussie.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2096,
        "cardType": "A",
        "text": "Andrew Hussie’s lips.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2097,
        "cardType": "A",
        "text": "Anonymous Soporifics Support.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2098,
        "cardType": "A",
        "text": "Apple Juice.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2099,
        "cardType": "A",
        "text": "Aradia Bot.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2100,
        "cardType": "A",
        "text": "Aradia Megido.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2101,
        "cardType": "A",
        "text": "Aradia’s charred, rotting corpse.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2102,
        "cardType": "A",
        "text": "Aranea Serket.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2103,
        "cardType": "A",
        "text": "Aranea's exposition stand.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2104,
        "cardType": "A",
        "text": "Arguing over troll sexuality.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2105,
        "cardType": "A",
        "text": "ARquiusprite’s muscles.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2106,
        "cardType": "A",
        "text": "Arthour the lusus.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2107,
        "cardType": "A",
        "text": "AVATAR.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2108,
        "cardType": "A",
        "text": "Baby Dave.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2109,
        "cardType": "A",
        "text": "Bard Quest.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2110,
        "cardType": "A",
        "text": "Beating the shit out of Terezi.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2111,
        "cardType": "A",
        "text": "Bec Noir.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2112,
        "cardType": "A",
        "text": "Becoming Tumblr famous.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2113,
        "cardType": "A",
        "text": "Being fuck deep in meowcats.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2114,
        "cardType": "A",
        "text": "Being in a relationship with a non-Homestuck.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2115,
        "cardType": "A",
        "text": "Being in a relationship with a non-Homestuck.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2116,
        "cardType": "A",
        "text": "Being locked in a Prospitian prison.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2117,
        "cardType": "A",
        "text": "Being the other guy.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2118,
        "cardType": "A",
        "text": "BETTY FUCKING CROCKER.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2119,
        "cardType": "A",
        "text": "Binge reading every fanfiction for a pairing and then hating yourself a little bit.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2120,
        "cardType": "A",
        "text": "BL1ND JUST1C3.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2121,
        "cardType": "A",
        "text": "Blackrom orgies.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2122,
        "cardType": "A",
        "text": "Bro and Dave banging while Rose watches.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2123,
        "cardType": "A",
        "text": "Bro.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2124,
        "cardType": "A",
        "text": "Bro's rapping ventriloquism act.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2125,
        "cardType": "A",
        "text": "Bro’s death.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2126,
        "cardType": "A",
        "text": "BUCKETS.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2127,
        "cardType": "A",
        "text": "Butler Island.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2128,
        "cardType": "A",
        "text": "C4NDY R3D BLOOD >:]",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2129,
        "cardType": "A",
        "text": "Caledscratch.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2130,
        "cardType": "A",
        "text": "Caliborn.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2131,
        "cardType": "A",
        "text": "Caliginous speed dating.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2132,
        "cardType": "A",
        "text": "Calliope.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2133,
        "cardType": "A",
        "text": "Can Town.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2134,
        "cardType": "A",
        "text": "Can Town.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2135,
        "cardType": "A",
        "text": "Cards Against Alternia.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2136,
        "cardType": "A",
        "text": "Carlos Maraka.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2137,
        "cardType": "A",
        "text": "Casey.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2138,
        "cardType": "A",
        "text": "Centaur milk.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2139,
        "cardType": "A",
        "text": "Charging down halls, shouting profanities and being silly.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2140,
        "cardType": "A",
        "text": "Cherub m-preg.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2141,
        "cardType": "A",
        "text": "Cherub mating rituals.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2142,
        "cardType": "A",
        "text": "Chest of WHIMSY.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2143,
        "cardType": "A",
        "text": "Cliched JohnKat fanfiction.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2144,
        "cardType": "A",
        "text": "Cod Palace.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2145,
        "cardType": "A",
        "text": "Cod Tier Gamzee.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2146,
        "cardType": "A",
        "text": "Communism!",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2147,
        "cardType": "A",
        "text": "Constantly breaking Hussie’s copyright.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2148,
        "cardType": "A",
        "text": "Cosplay sex.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2149,
        "cardType": "A",
        "text": "Cosplayers who do photo shoots in bondage (God bless them).",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2150,
        "cardType": "A",
        "text": "Cosplayers who do photo shoots in bondage (God bless them).",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2151,
        "cardType": "A",
        "text": "Cosplayers who don’t seal their paint.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2152,
        "cardType": "A",
        "text": "Crabdad.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2153,
        "cardType": "A",
        "text": "Creative uses for Aradia’s whip.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2154,
        "cardType": "A",
        "text": "Cronus actually getting laid.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2155,
        "cardType": "A",
        "text": "Cronus Ampora.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2156,
        "cardType": "A",
        "text": "Dad Egbert/Dad Crocker.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2157,
        "cardType": "A",
        "text": "Dad's pipe.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2158,
        "cardType": "A",
        "text": "Dad’s fedora.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2159,
        "cardType": "A",
        "text": "Damara Megido wearing white at her wedding.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2160,
        "cardType": "A",
        "text": "Damara Megido.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2161,
        "cardType": "A",
        "text": "Damara Megido’s existence.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2162,
        "cardType": "A",
        "text": "Dante Basco.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2163,
        "cardType": "A",
        "text": "Dating exclusively within the fandom.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2164,
        "cardType": "A",
        "text": "Dave Strider.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2165,
        "cardType": "A",
        "text": "Dave’s throbbing beef truncheon.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2166,
        "cardType": "A",
        "text": "Dead parents.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2167,
        "cardType": "A",
        "text": "Destroying clocks.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2168,
        "cardType": "A",
        "text": "Developing a deep fear of the sound of clown horns after becoming a Homestuck.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2169,
        "cardType": "A",
        "text": "Dirk Strider.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2170,
        "cardType": "A",
        "text": "Dirk’s self-insert MLP fan character.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2171,
        "cardType": "A",
        "text": "Discovering Sollux is red-blue colorblind.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2172,
        "cardType": "A",
        "text": "Doc Scratch.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2173,
        "cardType": "A",
        "text": "Drawing pornography for Caliborn.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2174,
        "cardType": "A",
        "text": "Elf tears.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2175,
        "cardType": "A",
        "text": "Equius cumming so hard he blows a hole straight through his partner.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2176,
        "cardType": "A",
        "text": "Equius Zahhak.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2177,
        "cardType": "A",
        "text": "Equius’s choice ass.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2178,
        "cardType": "A",
        "text": "Equius’s copy of \"Fifty Shades of Neigh.\"",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2179,
        "cardType": "A",
        "text": "Equius’s towel.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2180,
        "cardType": "A",
        "text": "Equius’s used towel pile.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2181,
        "cardType": "A",
        "text": "Eridan Ampora.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2182,
        "cardType": "A",
        "text": "Eridan crying after pailing Vriska for the first time.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2183,
        "cardType": "A",
        "text": "Eridan stripping to make rent.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2184,
        "cardType": "A",
        "text": "Eridan’s cape.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2185,
        "cardType": "A",
        "text": "Eridan’s empty quadrants.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2186,
        "cardType": "A",
        "text": "Eridan’s empty quadrants.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2187,
        "cardType": "A",
        "text": "Eridan’s lowwer half.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2188,
        "cardType": "A",
        "text": "Eridan’s upper half.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2189,
        "cardType": "A",
        "text": "Falling into a pool of lava.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2190,
        "cardType": "A",
        "text": "Fat Vriska.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2191,
        "cardType": "A",
        "text": "Faygo.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2192,
        "cardType": "A",
        "text": "Feferi Peixes.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2193,
        "cardType": "A",
        "text": "Feferi’s voluptuous curves.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2194,
        "cardType": "A",
        "text": "Fiduspawn.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2195,
        "cardType": "A",
        "text": "Fifty fucking Nepetas.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2196,
        "cardType": "A",
        "text": "Filling all of your quadrants.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2197,
        "cardType": "A",
        "text": "Filling all of your quadrants.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2198,
        "cardType": "A",
        "text": "Finding grey paint on your bathroom door three weeks after the last meetup.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2199,
        "cardType": "A",
        "text": "Fis)( puns!",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2200,
        "cardType": "A",
        "text": "Flighty broads.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2201,
        "cardType": "A",
        "text": "Flipping the fuck out.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2202,
        "cardType": "A",
        "text": "Game Bro Magazine.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2203,
        "cardType": "A",
        "text": "Gamzee Makara.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2204,
        "cardType": "A",
        "text": "Gamzee’s clown horns.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2205,
        "cardType": "A",
        "text": "gAmZeE’S pOtIoNs: 420 bOoNbUcKs.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2206,
        "cardType": "A",
        "text": "Geromy.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2207,
        "cardType": "A",
        "text": "Getting forked by a 2x3dent.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2208,
        "cardType": "A",
        "text": "Gl'bgolyb. AKA Feferi’s fucking lusus.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2209,
        "cardType": "A",
        "text": "Going to the bark side.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2210,
        "cardType": "A",
        "text": "Grandpa Harley/Grandma English.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2211,
        "cardType": "A",
        "text": "Grimbark Jade.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2212,
        "cardType": "A",
        "text": "Groincobblers.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2213,
        "cardType": "A",
        "text": "Gross misinterpretations of your favorite character.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2214,
        "cardType": "A",
        "text": "Hateclown on the side.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2215,
        "cardType": "A",
        "text": "Having STRONG surprise buttsex.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2216,
        "cardType": "A",
        "text": "Hellmurder Island.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2217,
        "cardType": "A",
        "text": "Hemostuck.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2218,
        "cardType": "A",
        "text": "Hemostuck.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2219,
        "cardType": "A",
        "text": "Her Imperious Condescenscion.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2220,
        "cardType": "A",
        "text": "Her Imperious Condescension’s royal butt-plug collection.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2221,
        "cardType": "A",
        "text": "Homesmut Voices.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2222,
        "cardType": "A",
        "text": "Homestuck stealing all the fans from Hetalia and then subsequently watching all its fans leave for OFF and Danganronpa.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2223,
        "cardType": "A",
        "text": "Homestuck.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2224,
        "cardType": "A",
        "text": "Homosuck.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2225,
        "cardType": "A",
        "text": "HONK HONK, MOTHER FUCKER.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2226,
        "cardType": "A",
        "text": "Horsearoni.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2227,
        "cardType": "A",
        "text": "Horuss Zahhak.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2228,
        "cardType": "A",
        "text": "Hot crossplayers.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2229,
        "cardType": "A",
        "text": "Hunk Rump Magazine.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2230,
        "cardType": "A",
        "text": "Hussie constantly breaking copyright and then telling his fans to not break his copyright.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2231,
        "cardType": "A",
        "text": "Hussie constantly breaking copyright.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2232,
        "cardType": "A",
        "text": "Hussie jacking it to our tears of anguish.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2233,
        "cardType": "A",
        "text": "Jade Harley.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2234,
        "cardType": "A",
        "text": "Jade’s dog penis and knot.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2235,
        "cardType": "A",
        "text": "Jailbreak.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2236,
        "cardType": "A",
        "text": "Jake English standing there like a fucking idiot.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2237,
        "cardType": "A",
        "text": "Jake English.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2238,
        "cardType": "A",
        "text": "Jake English’s assless chaps.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2239,
        "cardType": "A",
        "text": "Jake English’s choice ass.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2240,
        "cardType": "A",
        "text": "Jake English’s manhood.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2241,
        "cardType": "A",
        "text": "Jane Crocker.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2242,
        "cardType": "A",
        "text": "John Egbert.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2243,
        "cardType": "A",
        "text": "John’s flaming homosexuality.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2244,
        "cardType": "A",
        "text": "John’s Prankster’s Gambit.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2245,
        "cardType": "A",
        "text": "Just KNOWING that Slick is going to stab Ms. Paint.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2246,
        "cardType": "A",
        "text": "Kanaya destroying Cantown.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2247,
        "cardType": "A",
        "text": "Kanaya Maryam.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2248,
        "cardType": "A",
        "text": "Kanaya's ashen promiscuity.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2249,
        "cardType": "A",
        "text": "Kanaya’s chainsaw.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2250,
        "cardType": "A",
        "text": "Kankri Vantas.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2251,
        "cardType": "A",
        "text": "Karkat actually topping, for once.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2252,
        "cardType": "A",
        "text": "Karkat and Jade’s adorable little of mpreg puppies.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2253,
        "cardType": "A",
        "text": "Karkat dying of a burst blood vessel mid-rant.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2254,
        "cardType": "A",
        "text": "Karkat going through puberty before every other troll and being, like, nine feet tall.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2255,
        "cardType": "A",
        "text": "Karkat Tantrum Bingo.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2256,
        "cardType": "A",
        "text": "Karkat Vantas.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2257,
        "cardType": "A",
        "text": "Karkat’s ragegasm.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2258,
        "cardType": "A",
        "text": "Karkat’s tiny, angry looking dick.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2259,
        "cardType": "A",
        "text": "Kawaii Yaoi.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2260,
        "cardType": "A",
        "text": "Kurloz Makara.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2261,
        "cardType": "A",
        "text": "Lame bucket jokes.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2262,
        "cardType": "A",
        "text": "Latula Pyrope.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2263,
        "cardType": "A",
        "text": "Laying back and thinking of Alternia.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2264,
        "cardType": "A",
        "text": "Leprechaun m-preg.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2265,
        "cardType": "A",
        "text": "Liberty. Reason. Justice. Civility. Edification. Perfection. MAIL.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2266,
        "cardType": "A",
        "text": "Lil' Cal's dead eyes.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2267,
        "cardType": "A",
        "text": "Lil’ Cal.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2268,
        "cardType": "A",
        "text": "Lil’ Cal’s raging boner.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2269,
        "cardType": "A",
        "text": "Lil’ Hal.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2270,
        "cardType": "A",
        "text": "Lil’ Seb.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2271,
        "cardType": "A",
        "text": "Little children who poop hard in their baby ass diapers.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2272,
        "cardType": "A",
        "text": "Lord English.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2273,
        "cardType": "A",
        "text": "Lord English’s peg leg.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2274,
        "cardType": "A",
        "text": "Lucky Charms.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2275,
        "cardType": "A",
        "text": "Maid Equius.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2276,
        "cardType": "A",
        "text": "Maple Hoof.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2277,
        "cardType": "A",
        "text": "March Eridan.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2278,
        "cardType": "A",
        "text": "Masturbating while thinking of your OTP.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2279,
        "cardType": "A",
        "text": "Masturbating while thinking of your OTP.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2280,
        "cardType": "A",
        "text": "Maxing out your credit cards to buy Homestuck merchandise.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2281,
        "cardType": "A",
        "text": "Meenah Piexes.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2282,
        "cardType": "A",
        "text": "Meulin Leijon.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2283,
        "cardType": "A",
        "text": "Mierfa Durgas.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2284,
        "cardType": "A",
        "text": "Mierfa Durgas’ troll-horn nunchakus.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2285,
        "cardType": "A",
        "text": "Mind honey.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2286,
        "cardType": "A",
        "text": "Mister Dude, Sir Brah, Dood Dude, Vitamin D, Dude Esquire.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2287,
        "cardType": "A",
        "text": "Mituna Captor.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2288,
        "cardType": "A",
        "text": "Mom.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2289,
        "cardType": "A",
        "text": "MS Paint Adventures.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2290,
        "cardType": "A",
        "text": "MSPARP.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2291,
        "cardType": "A",
        "text": "Murdering angels.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2292,
        "cardType": "A",
        "text": "Muscle beasts.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2293,
        "cardType": "A",
        "text": "My Little Hoofbeast: Moirailigence Is Magic.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2294,
        "cardType": "A",
        "text": "Nektan Whelan.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2295,
        "cardType": "A",
        "text": "Neophyte Redglare.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2296,
        "cardType": "A",
        "text": "Nepeta Leijon.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2297,
        "cardType": "A",
        "text": "Nepeta violently mauling people with bad ships.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2298,
        "cardType": "A",
        "text": "Nepeta’s heat cycle.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2299,
        "cardType": "A",
        "text": "Nepeta’s shipping chart.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2300,
        "cardType": "A",
        "text": "Never being able to look at apple juice, milk, buckets, or knitting needles without feeling a little bit uncormfortable.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2301,
        "cardType": "A",
        "text": "Never dating a Serket.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2302,
        "cardType": "A",
        "text": "Nic Cage saying \"boner.\"",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2303,
        "cardType": "A",
        "text": "No homo.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2304,
        "cardType": "A",
        "text": "Noping the fuck out of there.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2305,
        "cardType": "A",
        "text": "Not shipping it.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2306,
        "cardType": "A",
        "text": "Nyehs and wwehs.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2307,
        "cardType": "A",
        "text": "Only cosplaying male characters when you get pregnant.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2308,
        "cardType": "A",
        "text": "Overtaking entire conventions.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2309,
        "cardType": "A",
        "text": "Paint splatters that look like troll cum.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2310,
        "cardType": "A",
        "text": "PantsKat.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2311,
        "cardType": "A",
        "text": "Paradox slime.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2312,
        "cardType": "A",
        "text": "Petstuck.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2313,
        "cardType": "A",
        "text": "PipeFan413.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2314,
        "cardType": "A",
        "text": "Plush Rump Magazine.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2315,
        "cardType": "A",
        "text": "Plush rump.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2316,
        "cardType": "A",
        "text": "Porrim Maryam.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2317,
        "cardType": "A",
        "text": "Porrim's condom stash.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2318,
        "cardType": "A",
        "text": "Porrim’s motherly affections.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2319,
        "cardType": "A",
        "text": "Post-apocalyptic shroudwear.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2320,
        "cardType": "A",
        "text": "Problem Sleuth.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2321,
        "cardType": "A",
        "text": "Recuperacoon.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2322,
        "cardType": "A",
        "text": "Remembering that awkward time when Karkat called Future arachnidsGrip \"FAG.\"",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2323,
        "cardType": "A",
        "text": "Rose and Kanaya snuggling.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2324,
        "cardType": "A",
        "text": "Rose Lalonde.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2325,
        "cardType": "A",
        "text": "Rose telling John she’s a lesbian and they will never be together.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2326,
        "cardType": "A",
        "text": "Rose’s review of \"My Immortal.\"",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2327,
        "cardType": "A",
        "text": "Roxy Lalonde.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2328,
        "cardType": "A",
        "text": "Rufio.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2329,
        "cardType": "A",
        "text": "Rufioh Nitram.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2330,
        "cardType": "A",
        "text": "Sacred leggings.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2331,
        "cardType": "A",
        "text": "SBAHJ hentai doujinshi.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2332,
        "cardType": "A",
        "text": "Schrödinger's Nepeta.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2333,
        "cardType": "A",
        "text": "SCIENCE WAND!",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2334,
        "cardType": "A",
        "text": "Seadweller dick fins.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2335,
        "cardType": "A",
        "text": "Selling your soul to Hussie.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2336,
        "cardType": "A",
        "text": "Shippers.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2337,
        "cardType": "A",
        "text": "Shipping it.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2338,
        "cardType": "A",
        "text": "Shipping the fuck out of something.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2339,
        "cardType": "A",
        "text": "Ships ending in -cest.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2340,
        "cardType": "A",
        "text": "Shitty swords.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2341,
        "cardType": "A",
        "text": "Shopping with Terezi.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2342,
        "cardType": "A",
        "text": "Sick fires.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2343,
        "cardType": "A",
        "text": "Skipping to Act 5.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2344,
        "cardType": "A",
        "text": "Sleeping ten people to a room at conventions.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2345,
        "cardType": "A",
        "text": "Sloppy inter-species makeouts.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2346,
        "cardType": "A",
        "text": "Smuppets.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2347,
        "cardType": "A",
        "text": "Sobbing uncontrollably while reading fanfiction.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2348,
        "cardType": "A",
        "text": "Sollux Captor.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2349,
        "cardType": "A",
        "text": "Sollux’s bifurcated bone bulge.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2350,
        "cardType": "A",
        "text": "Sopor pies.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2351,
        "cardType": "A",
        "text": "SORD.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2352,
        "cardType": "A",
        "text": "Soul portraits.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2353,
        "cardType": "A",
        "text": "Species-swap fanfics.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2354,
        "cardType": "A",
        "text": "Spidermom.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2355,
        "cardType": "A",
        "text": "Staying up to three AM, cleaning the grey off every surface of your hotel room in a desperate bid to not get fined.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2356,
        "cardType": "A",
        "text": "Stealing Tavros’s wheelchair.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2357,
        "cardType": "A",
        "text": "Stridercest.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2358,
        "cardType": "A",
        "text": "Sugoi Yuri.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2359,
        "cardType": "A",
        "text": "sweet bro and hell jeff.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2360,
        "cardType": "A",
        "text": "TAB.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2361,
        "cardType": "A",
        "text": "Tavros Nitram.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2362,
        "cardType": "A",
        "text": "Tavros’s wheelchair.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2363,
        "cardType": "A",
        "text": "Telling Sollux what happens to male bees after sex.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2364,
        "cardType": "A",
        "text": "Tentabulges.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2365,
        "cardType": "A",
        "text": "Tentative thank-you stabs.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2366,
        "cardType": "A",
        "text": "Terezi Pyrope.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2367,
        "cardType": "A",
        "text": "That dead crow with the sword through it.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2368,
        "cardType": "A",
        "text": "That human vacation with the giant red chimney-ass-hole.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2369,
        "cardType": "A",
        "text": "That shitty apple.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2370,
        "cardType": "A",
        "text": "That wonderful feeling when you take off your binder.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2371,
        "cardType": "A",
        "text": "The \"special attachments\" we ALL know that Equius gave to AradiaBot.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2372,
        "cardType": "A",
        "text": "The 7th Gate.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2373,
        "cardType": "A",
        "text": "The animes.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2374,
        "cardType": "A",
        "text": "The Condesce’s crotch.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2375,
        "cardType": "A",
        "text": "The Condesce’s selfies.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2376,
        "cardType": "A",
        "text": "The Dildo of Oglogoth.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2377,
        "cardType": "A",
        "text": "The Disciple.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2378,
        "cardType": "A",
        "text": "The Dolorosa.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2379,
        "cardType": "A",
        "text": "The E%ecutor/Expatri8 Darkleer.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2380,
        "cardType": "A",
        "text": "The Exiles.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2381,
        "cardType": "A",
        "text": "The Felt.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2382,
        "cardType": "A",
        "text": "The gays.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2383,
        "cardType": "A",
        "text": "The glory that is BroJohn.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2384,
        "cardType": "A",
        "text": "The Grand Highblood.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2385,
        "cardType": "A",
        "text": "The Great Hiatus of 2013.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2386,
        "cardType": "A",
        "text": "The green sun.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2387,
        "cardType": "A",
        "text": "The guy who fingered an Ampora.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2388,
        "cardType": "A",
        "text": "The Handmaid.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2389,
        "cardType": "A",
        "text": "The hemospectrum.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2390,
        "cardType": "A",
        "text": "The Hilarocaust.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2391,
        "cardType": "A",
        "text": "The Homestuck drinking game (do a shot every time someone dies!)",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2392,
        "cardType": "A",
        "text": "The Insane Clown Posse.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2393,
        "cardType": "A",
        "text": "The little red arm-swingy-dealy thing or whatever it is called.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2394,
        "cardType": "A",
        "text": "The Marquise Spinneret Mindfang.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2395,
        "cardType": "A",
        "text": "The Mayor.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2396,
        "cardType": "A",
        "text": "The mere concept of the Olive Garden.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2397,
        "cardType": "A",
        "text": "The Midnight Crew.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2398,
        "cardType": "A",
        "text": "The noises Mituna makes during sex.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2399,
        "cardType": "A",
        "text": "The Orphaner Dualscar.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2400,
        "cardType": "A",
        "text": "The Psiionic.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2401,
        "cardType": "A",
        "text": "The ridiculous fact that some people communicate without luminous rear ends.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2402,
        "cardType": "A",
        "text": "The Shipping Olympics.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2403,
        "cardType": "A",
        "text": "The significant purposes, biologically speaking, of troll nipples.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2404,
        "cardType": "A",
        "text": "The slammer.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2405,
        "cardType": "A",
        "text": "The Sufferer/The Signless.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2406,
        "cardType": "A",
        "text": "The Summoner.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2407,
        "cardType": "A",
        "text": "The sweat-drenched, rippling muscles of several truly majestically endowed hoofbeasts.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2408,
        "cardType": "A",
        "text": "The undeniable fact that Gamzee did nothing wrong.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2409,
        "cardType": "A",
        "text": "The unimaginable amounts of cash Faygo’s been making off of Homestucks.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2410,
        "cardType": "A",
        "text": "The Wrinklefucker.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2411,
        "cardType": "A",
        "text": "The Wrinklefucker.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2412,
        "cardType": "A",
        "text": "Toilet displacement.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2413,
        "cardType": "A",
        "text": "Topping from the bottom.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2414,
        "cardType": "A",
        "text": "Triggers.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2415,
        "cardType": "A",
        "text": "Troll blood.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2416,
        "cardType": "A",
        "text": "Troll horns.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2417,
        "cardType": "A",
        "text": "Troll Will Smith.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2418,
        "cardType": "A",
        "text": "Trolls misunderstanding what \"Bucket List\" means.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2419,
        "cardType": "A",
        "text": "Tumblr spoilers.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2420,
        "cardType": "A",
        "text": "Tumblr user Egberts.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2421,
        "cardType": "A",
        "text": "Tumblr user Pizza.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2422,
        "cardType": "A",
        "text": "Tumblr.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2423,
        "cardType": "A",
        "text": "Unreal air.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2424,
        "cardType": "A",
        "text": "UPD8!!!!!!!!",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2425,
        "cardType": "A",
        "text": "UPS delivery woman Nepeta.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2426,
        "cardType": "A",
        "text": "Viceroy Bubbles von Salamancer.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2427,
        "cardType": "A",
        "text": "Violent Blackrom sex.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2428,
        "cardType": "A",
        "text": "Vodka Mutini.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2429,
        "cardType": "A",
        "text": "Vodka.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2430,
        "cardType": "A",
        "text": "Vriska dying after being stabbed by Terezi.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2431,
        "cardType": "A",
        "text": "Vriska Serket.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2432,
        "cardType": "A",
        "text": "Vriska’s SEXY sex tips for having SEXY SEX!",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2433,
        "cardType": "A",
        "text": "Warhammer of Zillyhoo.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2434,
        "cardType": "A",
        "text": "What pumpkin?",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2435,
        "cardType": "A",
        "text": "When your favorite character dies.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2436,
        "cardType": "A",
        "text": "where MAKING THIS HAPEN",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2437,
        "cardType": "A",
        "text": "Willingly filling buckets with Eridan.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2438,
        "cardType": "A",
        "text": "Wondering if Meenah has a pitch crush on John, what with the attempted stabbings.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2439,
        "cardType": "A",
        "text": "World building!",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2440,
        "cardType": "A",
        "text": "Your 300 pound matronly freight-train.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2441,
        "cardType": "A",
        "text": "Your lusus giving you \"The Talk.\"",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2442,
        "cardType": "A",
        "text": "Your Mary Sue fantroll.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2443,
        "cardType": "A",
        "text": "Your privilege.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2444,
        "cardType": "A",
        "text": "Your significant other coming home and finding you in full grey cosplay.",
        "numAnswers": 0,
        "expansion": "Alternia"
    },
    {
        "id": 2445,
        "cardType": "Q",
        "text": "_ makes the Homestuck fandom uncomfortable.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2446,
        "cardType": "Q",
        "text": "_ stays awake at night, crying over _.",
        "numAnswers": 2,
        "expansion": "Alternia"
    },
    {
        "id": 2447,
        "cardType": "Q",
        "text": "_ totally makes me question my sexuality.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2448,
        "cardType": "Q",
        "text": "_. On the roof. Now.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2449,
        "cardType": "Q",
        "text": "_. It keeps happening!",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2450,
        "cardType": "Q",
        "text": "\"Sacred leggings\" was a mistranslation. The Sufferer actually died in Sacred _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2451,
        "cardType": "Q",
        "text": "After throwing _ at Karkat’s head, Dave made the intriguing discover that troll horns are very sensitive.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2452,
        "cardType": "Q",
        "text": "AG: Who needs luck when you have _?",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2453,
        "cardType": "Q",
        "text": "All _. All of it!",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2454,
        "cardType": "Q",
        "text": "Alternia’s political system was based upon _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2455,
        "cardType": "Q",
        "text": "Believe it or not, Kankri’s biggest trigger is _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2456,
        "cardType": "Q",
        "text": "Calliborn wants you to draw pornography of _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2457,
        "cardType": "Q",
        "text": "Dave Strider likes _, but only ironically.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2458,
        "cardType": "Q",
        "text": "Equius beats up Eridan for _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2459,
        "cardType": "Q",
        "text": "Everybody out of the god damn way. You’ve got a heart full of _, a soul full of _, and a body full of _. (Draw two, play three)",
        "numAnswers": 3,
        "expansion": "Alternia"
    },
    {
        "id": 2460,
        "cardType": "Q",
        "text": "Feferi secretly hates _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2461,
        "cardType": "Q",
        "text": "For Betty Crocker’s latest ad campaign/brainwashing scheme, she is using _ as inspiration.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2462,
        "cardType": "Q",
        "text": "For his birthday, Dave gave John _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2463,
        "cardType": "Q",
        "text": "Fuckin’ _. How do they work?",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2464,
        "cardType": "Q",
        "text": "Gamzee not only likes using his clubs for juggling and strifing, he also uses them for_.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2465,
        "cardType": "Q",
        "text": "Getting a friend to read Homestuck is like _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2466,
        "cardType": "Q",
        "text": "How do I live without _?",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2467,
        "cardType": "Q",
        "text": "Hussie died on his quest bed and rose as the fully realized _ of _.",
        "numAnswers": 2,
        "expansion": "Alternia"
    },
    {
        "id": 2468,
        "cardType": "Q",
        "text": "Hussie unintentionally revealed that Homestuck will end with _ and _ consummating their relationship at last.",
        "numAnswers": 2,
        "expansion": "Alternia"
    },
    {
        "id": 2469,
        "cardType": "Q",
        "text": "I am _. It’s me.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2470,
        "cardType": "Q",
        "text": "I finally became Tumblr famous when I released a gifset of _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2471,
        "cardType": "Q",
        "text": "I just found _ in my closet it is like fucking christmas up in here.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2472,
        "cardType": "Q",
        "text": "I warned you about _, bro! I told you, dog!",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2473,
        "cardType": "Q",
        "text": "In the final battle, John distracts Lord English by showing him _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2474,
        "cardType": "Q",
        "text": "It’s hard, being _. It’s hard and no one understands.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2475,
        "cardType": "Q",
        "text": "John is a good boy. And he loves _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2476,
        "cardType": "Q",
        "text": "John may not be a homosexual, but he has a serious thing for _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2477,
        "cardType": "Q",
        "text": "Kanaya reached into her dead lusus’s stomach and retrieved _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2478,
        "cardType": "Q",
        "text": "Kanaya tells Karkat about _ to cheer him up.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2479,
        "cardType": "Q",
        "text": "Karkat gave our universe _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2480,
        "cardType": "Q",
        "text": "Latula and Porrin have decided to teach Kankri about the wonders of _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2481,
        "cardType": "Q",
        "text": "Little did they know, the key to defeating Lord English was actually _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2482,
        "cardType": "Q",
        "text": "Little known fact: Kurloz’s stitching is actually made out of _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2483,
        "cardType": "Q",
        "text": "Nanna baked a cake for John to commemorate _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2484,
        "cardType": "Q",
        "text": "Nepeta only likes Karkat for his _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2485,
        "cardType": "Q",
        "text": "Nepeta’s secret OTP is _ with _.",
        "numAnswers": 2,
        "expansion": "Alternia"
    },
    {
        "id": 2486,
        "cardType": "Q",
        "text": "Nobody was surprised to find _ under Jade’s skirt. The surprise was she used it for/on _.",
        "numAnswers": 2,
        "expansion": "Alternia"
    },
    {
        "id": 2487,
        "cardType": "Q",
        "text": "Porrim made Kankri a sweater to cover his _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2488,
        "cardType": "Q",
        "text": "Problem Sleuth had a hard time investigating _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2489,
        "cardType": "Q",
        "text": "Rose was rather disgusted when she started reading about _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2490,
        "cardType": "Q",
        "text": "Terezi can top anyone except _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2491,
        "cardType": "Q",
        "text": "The hole in Kanaya’s stomach is so large, she can fit _ in it.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2492,
        "cardType": "Q",
        "text": "The next thing Hussie will turn into a sex joke will be _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2493,
        "cardType": "Q",
        "text": "The only way to beat Vriska in an eating contest is to put _ on the table.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2494,
        "cardType": "Q",
        "text": "The real reason Terezi stabbed Vriska was to punish her for _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2495,
        "cardType": "Q",
        "text": "The secret way to achieve God Tier is to die on top of _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2496,
        "cardType": "Q",
        "text": "The thing that made Kankri break his vow of celibacy was _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2497,
        "cardType": "Q",
        "text": "Turns out, pre-entry prototyping with _ was not the best idea.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2498,
        "cardType": "Q",
        "text": "Vriska killed Spidermom with _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2499,
        "cardType": "Q",
        "text": "Vriska roleplays _ with Terezi as _.",
        "numAnswers": 2,
        "expansion": "Alternia"
    },
    {
        "id": 2500,
        "cardType": "Q",
        "text": "Vriska’s greatest regret is _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2501,
        "cardType": "Q",
        "text": "Wear  _. Be _.",
        "numAnswers": 2,
        "expansion": "Alternia"
    },
    {
        "id": 2502,
        "cardType": "Q",
        "text": "What did Jake get Dirk for his birthday?",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2503,
        "cardType": "Q",
        "text": "What is the worst thing that Terezi ever licked?",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2504,
        "cardType": "Q",
        "text": "What is your OT3? (Draw 2, play 3.)",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2505,
        "cardType": "Q",
        "text": "What makes your kokoro go \"doki doki\"?",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2506,
        "cardType": "Q",
        "text": "What's in the box, Jack?",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2507,
        "cardType": "Q",
        "text": "When a bucket is unavailable, trolls with use _.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2508,
        "cardType": "Q",
        "text": "When Dave received _ from his Bro for his 9th birthday, be felt a little warm inside.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2509,
        "cardType": "Q",
        "text": "Whenever I see _ on MSPARP, I disconnect immediately.",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2510,
        "cardType": "Q",
        "text": "where doing it man. where MAKING _ HAPEN!",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2511,
        "cardType": "Q",
        "text": "Your name is JOHN EGBERT and boy do you love _!",
        "numAnswers": 1,
        "expansion": "Alternia"
    },
    {
        "id": 2512,
        "cardType": "A",
        "text": "Making 77 cents on the dollar (unless you're Latina).",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2513,
        "cardType": "A",
        "text": "Inspirational Dove chocolate wrappers.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2514,
        "cardType": "Q",
        "text": "Hey, Susie. I know your job is _ but can you just grab me _? Thanks.",
        "numAnswers": 2,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2515,
        "cardType": "A",
        "text": "Masturbating to Ty Pennington.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2516,
        "cardType": "A",
        "text": "Pretending you'll wear that bridesmaid dress again.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2517,
        "cardType": "A",
        "text": "Mansplaining.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2518,
        "cardType": "A",
        "text": "Beyonce thinkpieces.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2519,
        "cardType": "A",
        "text": "Gabby Giffords' physical therapy.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2520,
        "cardType": "A",
        "text": "Female genital mutilation.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2521,
        "cardType": "A",
        "text": "When the tampon's too low and you feel it with every step.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2522,
        "cardType": "A",
        "text": "A joke too funny for women to understand.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2523,
        "cardType": "A",
        "text": "Meryl Streep selfies.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2524,
        "cardType": "A",
        "text": "Hillary bitch-slapping Bill with a frozen tuna.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2525,
        "cardType": "A",
        "text": "The Bechdel Test.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2526,
        "cardType": "A",
        "text": "Staph infections from dirty nail salons.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2527,
        "cardType": "Q",
        "text": "This month in Cosmo: how to give your man _ at the expense of _.",
        "numAnswers": 2,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2528,
        "cardType": "A",
        "text": "Stalking wedding photos on Facebook, weeping softly.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2529,
        "cardType": "A",
        "text": "Emma Goldman burning the whole motherfucker down.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2530,
        "cardType": "A",
        "text": "Douches that smell like rain.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2531,
        "cardType": "A",
        "text": "Rosa Parks' back seat.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2532,
        "cardType": "A",
        "text": "Engagement photos on train tracks.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2533,
        "cardType": "A",
        "text": "Choking on the ashes of Gloria Steinem's bras.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2534,
        "cardType": "A",
        "text": "The cold, hard truth that no lesbian has ever scissored.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2535,
        "cardType": "A",
        "text": "Doing your kegels at work.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2536,
        "cardType": "A",
        "text": "Misandry.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2537,
        "cardType": "A",
        "text": "Abortion Barbie.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2538,
        "cardType": "A",
        "text": "Telling a street harasser \"You know what? I *will* blow you.\"",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2539,
        "cardType": "A",
        "text": "Peggy Olson's cutthroat ambitions.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2540,
        "cardType": "A",
        "text": "A quickie with Rachel Maddow in the green room.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2541,
        "cardType": "A",
        "text": "Forcefeeding Sheryl Sandberg the pages of Lean In, one by one.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2542,
        "cardType": "A",
        "text": "Emma Watson, Emma Stone, EMMA THOMPSON BITCHES.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2543,
        "cardType": "Q",
        "text": "Are you there, God? It's me, _",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2544,
        "cardType": "A",
        "text": "Dumpsters overflowing with whimisical save-the-date magnets.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2545,
        "cardType": "Q",
        "text": "50 Shades of _.",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2546,
        "cardType": "A",
        "text": "The torture chamber where Kathryn Bigelow keeps James Cameron.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2547,
        "cardType": "A",
        "text": "A detailed vajazzling of Van Goh's Starry Night.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2548,
        "cardType": "Q",
        "text": "It's not length, it's _.",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2549,
        "cardType": "A",
        "text": "STOP MAKING ME PRETEND TO CARE ABOUT YOUR WEDDING PINTEREST DARLA.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2550,
        "cardType": "A",
        "text": "The Chub Rub.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2551,
        "cardType": "A",
        "text": "Chin hairs you pretend you don't have.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2552,
        "cardType": "Q",
        "text": "Whatever, Peeta. You'll never understand my struggle with _.",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2553,
        "cardType": "A",
        "text": "A strongly worded letter to Netflix demanding the addition of \"The Good Wife\".",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2554,
        "cardType": "A",
        "text": "Doubling up on sports bras.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2555,
        "cardType": "A",
        "text": "When a dog smells your crotch and you know exactly why.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2556,
        "cardType": "Q",
        "text": "Men are from _, women are from _.",
        "numAnswers": 2,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2557,
        "cardType": "A",
        "text": "Malala's gunshot wounds.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2558,
        "cardType": "A",
        "text": "Lactating when a stranger's baby cries on the train.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2559,
        "cardType": "Q",
        "text": "Why does the Komen Foundation hate Planned Parenthood?",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2560,
        "cardType": "A",
        "text": "A new cookbook by Sylvia Plath.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2561,
        "cardType": "A",
        "text": "Crying in the fitting room during bikini season.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2562,
        "cardType": "Q",
        "text": "Math is hard. Let's go _!",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2563,
        "cardType": "A",
        "text": "Eating the entire bag.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2564,
        "cardType": "Q",
        "text": "The latest proposal in the Texas legislature is to take away _ from women.",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2565,
        "cardType": "A",
        "text": "Scalding hot wax right there on your labia.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2566,
        "cardType": "A",
        "text": "The G-Spot, the Y-spot, the other spot you made up to confuse your partner.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2567,
        "cardType": "Q",
        "text": "If you don't mind my asking, how *do* lesbians have sex?",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2568,
        "cardType": "A",
        "text": "The Golden Girls' never-ending supply of frozen cheesecake.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2569,
        "cardType": "A",
        "text": "Forcefeeding Sheryl Sandberg the pages of Lean In, one by one.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2570,
        "cardType": "A",
        "text": "Underboob swet like rancid milk.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2571,
        "cardType": "Q",
        "text": "In her next romcom, Katherine Heigl plays a woman who falls in love with her boss's _.",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2572,
        "cardType": "A",
        "text": "Wondering whether your girl crush on Hermione constitutes pedophilia.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2573,
        "cardType": "A",
        "text": "Taking a giant dump on the 18th green at the Augusta National Golf Club.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2574,
        "cardType": "A",
        "text": "A brown smudge equally likely to be period blood or chocolate.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2575,
        "cardType": "Q",
        "text": "The Pantone color of the year is inspired by _.",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2576,
        "cardType": "A",
        "text": "A hand-crocheted Diva Cup case from Etsy.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2577,
        "cardType": "Q",
        "text": "What is Olivia Pope's secret to removing red wine stains from white clothes?",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2578,
        "cardType": "A",
        "text": "Your gigantic crush on Jenna Lyons.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2579,
        "cardType": "A",
        "text": "A one-way ticket to Steubenville.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2580,
        "cardType": "A",
        "text": "A bodice-ripping 4-way with Alexander Skarsgard, Ian Somerhalder, and David Boreanaz.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2581,
        "cardType": "Q",
        "text": "Why exactly was Alanis so mad at Uncle Joey?",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2582,
        "cardType": "A",
        "text": "Finger banging Michelle Rodriguez.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2583,
        "cardType": "A",
        "text": "Princess Aurora maniacally devouring the still-beating heart of Maleficent.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2584,
        "cardType": "Q",
        "text": "Why do men on the Internet send me pictures of _?",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2585,
        "cardType": "A",
        "text": "A tear stained copy of Reviving Ophelia.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2586,
        "cardType": "A",
        "text": "A misogynist dystopia set in a not-too-distant WAIT A MINUTE.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2587,
        "cardType": "A",
        "text": "Dying your hair red like Angela Chase.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2588,
        "cardType": "A",
        "text": "Daenerys Targaryen's fire-breathing vajayjay.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2589,
        "cardType": "Q",
        "text": "What's my weapon of choice in the \"War on Women\"?",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2590,
        "cardType": "A",
        "text": "Resentfully clicking like on your boss's vacation photos.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2591,
        "cardType": "A",
        "text": "Calmly informing your date that you understand the infield fly rule better than he does.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2592,
        "cardType": "A",
        "text": "Tina Fey and Amy Poehler making out on a pile of Bitch magazines.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2593,
        "cardType": "A",
        "text": "Only shaving up to the knee.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2594,
        "cardType": "A",
        "text": "Meredith Grey's slut phase.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2595,
        "cardType": "A",
        "text": "Shameful childhood memories of envying the wheelchair girl who got all the attention.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2596,
        "cardType": "Q",
        "text": "What's Seth MacFarlane's problem?",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2597,
        "cardType": "A",
        "text": "Sort of wishing the baby on the plane would die.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2598,
        "cardType": "A",
        "text": "Tenderly dominating Uncle Jesse from behind.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2599,
        "cardType": "A",
        "text": "Stumbling on David Wright performing as Judy Garland in the East Village.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2600,
        "cardType": "A",
        "text": "Urinating on yourself to prevent an assault.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2601,
        "cardType": "A",
        "text": "When a FOX News anchor causally references 'ebonics'.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2602,
        "cardType": "A",
        "text": "Getting DPed by the Property Brothers on a custom granite countertop.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2603,
        "cardType": "Q",
        "text": "I couldn't help but wonder: was it Mr. Big, or was it _?",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2604,
        "cardType": "A",
        "text": "Being compared to a Cathy Cartoon on Metafilter.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2605,
        "cardType": "A",
        "text": "Kim Kardashian's placenta banh mi.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2606,
        "cardType": "Q",
        "text": "What fell into my bra?",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2607,
        "cardType": "A",
        "text": "Asking Gilbert Gottfried to do the Iago voice during sex.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2608,
        "cardType": "A",
        "text": "Watching Bethenny Frankel struggle for life in a churning sea of pre-mixed SkinnyGirl cocktails.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2609,
        "cardType": "A",
        "text": "An alternate version of the Washington Monument that looks kind of like a vagina.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2610,
        "cardType": "Q",
        "text": "What's my preferred method of contraception?",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2611,
        "cardType": "A",
        "text": "Telling Pacey your innermost secrets in a canoe beneath the Capeside stars.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2612,
        "cardType": "A",
        "text": "The blue liquid from tampon commercials.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2613,
        "cardType": "Q",
        "text": "Sofia Coppola's new film focuses on a wealthy young white woman feeling alienated by _.",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2614,
        "cardType": "A",
        "text": "Patti Stanger's line of jewelry.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2615,
        "cardType": "A",
        "text": "#solidarityisforwhitewomen.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2616,
        "cardType": "Q",
        "text": "_: the Tori Amos song that changed my life",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2617,
        "cardType": "A",
        "text": "A candlelight vigil for Nicole Brown Smith.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2618,
        "cardType": "Q",
        "text": "Something old, something new, something borrowed, and _.",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2619,
        "cardType": "A",
        "text": "Sexual fantasies involving Mindy Lahiri and a sumptuous coffeecake.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2620,
        "cardType": "A",
        "text": "Tweeting Cory Booker about that guy walking behind you.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2621,
        "cardType": "A",
        "text": "A gender neutral, owl-themed baby announcement.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2622,
        "cardType": "Q",
        "text": "Why can't we have nice things?",
        "numAnswers": 1,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2623,
        "cardType": "A",
        "text": "Being the only woman at the office-mandated sexual harassment training.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2624,
        "cardType": "A",
        "text": "Asking Larry Summers increasingly difficult mathematical questions until Bar and Mat Mitzvahs are considered equally important.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2625,
        "cardType": "A",
        "text": "Cramming Vladimir Putin full of Activia until he poops out Russia's homophobia.",
        "numAnswers": 0,
        "expansion": "Ladies Against Humanity"
    },
    {
        "id": 2626,
        "cardType": "Q",
        "text": "In an attempt to reach a wider audience, the Royal Ontario Museum has opened an interactive exhibit on _.",
        "numAnswers": 1,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2627,
        "cardType": "Q",
        "text": "What's the Canadian government using to inspire rural students to suceed?",
        "numAnswers": 1,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2628,
        "cardType": "Q",
        "text": "in the next Bob and Doug McKenzie adventure, they have to find _ to uncover a sinister plot involving _ and _.",
        "numAnswers": 3,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2629,
        "cardType": "Q",
        "text": "Air canada guidelines now prohibit _ on airplanes.",
        "numAnswers": 1,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2630,
        "cardType": "Q",
        "text": "CTV presents _, the store of _.",
        "numAnswers": 2,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2631,
        "cardType": "Q",
        "text": "In Vancouver it is now legal to _.",
        "numAnswers": 1,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2632,
        "cardType": "Q",
        "text": "O Canada, we stand on guard for _.",
        "numAnswers": 1,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2633,
        "cardType": "Q",
        "text": "If _ came in two-fours, Canada would be more _.",
        "numAnswers": 2,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2634,
        "cardType": "Q",
        "text": "After unifying the GST and PST, the Government can now afford to provide _ for _.",
        "numAnswers": 2,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2635,
        "cardType": "A",
        "text": "Snotsicles",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2636,
        "cardType": "A",
        "text": "Naked News.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2637,
        "cardType": "A",
        "text": "Done Cherry's wardrobe.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2638,
        "cardType": "A",
        "text": "Syrupy sex with a maple tree.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2639,
        "cardType": "A",
        "text": "Terry Fox's prosthetic leg.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2640,
        "cardType": "A",
        "text": "Canada: American's hat.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2641,
        "cardType": "A",
        "text": "Homo milk.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2642,
        "cardType": "A",
        "text": "Mr. Dressup.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2643,
        "cardType": "A",
        "text": "The Front de Libération du Québec.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2644,
        "cardType": "A",
        "text": "Heritage minutes.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2645,
        "cardType": "A",
        "text": "The Royal Canadian Mounted Police",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2646,
        "cardType": "A",
        "text": "Stephen Harper",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2647,
        "cardType": "A",
        "text": "Burning down the White House.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2648,
        "cardType": "A",
        "text": "Being Canadian",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2649,
        "cardType": "A",
        "text": "The Famous Five.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2650,
        "cardType": "A",
        "text": "A Molson muscle.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2651,
        "cardType": "A",
        "text": "An icy hand job from an Edmonton hooker.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2652,
        "cardType": "A",
        "text": "Poutine",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2653,
        "cardType": "A",
        "text": "Schmirler the Curler.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2654,
        "cardType": "A",
        "text": "The Official Languages Act. La Loi sure les langues officielles.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2655,
        "cardType": "A",
        "text": "Newfies.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2656,
        "cardType": "A",
        "text": "The CBC.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2657,
        "cardType": "A",
        "text": "Graham Greene playing the same First Nations character on every TV show.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2658,
        "cardType": "A",
        "text": "Killing a moose with your bare hands.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2659,
        "cardType": "A",
        "text": "tim Hortons.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2660,
        "cardType": "A",
        "text": "Quintland.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2661,
        "cardType": "A",
        "text": "Karla Momolka.",
        "numAnswers": 0,
        "expansion": "Canadian Conversion Kit"
    },
    {
        "id": 2662,
        "cardType": "Q",
        "text": "When Verity snuck out for her nightly exhibitionistic jaunt, she didn't expect to come face to face with _.",
        "numAnswers": 1,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2663,
        "cardType": "Q",
        "text": "Programmable clothes that can turn into any imaginable garment are great, but didn't the designers consider _?",
        "numAnswers": 1,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2664,
        "cardType": "Q",
        "text": "Procurator Marcus Amandus set out to explore Lake Ontarius and discovered _.",
        "numAnswers": 1,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2665,
        "cardType": "Q",
        "text": "You can satiate any sexual proclivity in Metamor City, if you look hard enough. Even _.",
        "numAnswers": 1,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2666,
        "cardType": "Q",
        "text": "The new performers in the Artbodies strip club have raised a few eyebrows. Who'd have thought to combine _ with _?",
        "numAnswers": 2,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2667,
        "cardType": "Q",
        "text": "In the next episode of Monster Whisperer, Dale Clearwater helps a _ whose tentacle monster is plagued with _.",
        "numAnswers": 2,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2668,
        "cardType": "Q",
        "text": "The title of the new erotica anthology this month is: 'Like _.'",
        "numAnswers": 1,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2669,
        "cardType": "Q",
        "text": "Because of the 'accident' yesterday, the Scout Academy now forbids cadets from having any contact whatsoever with _.",
        "numAnswers": 1,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2670,
        "cardType": "Q",
        "text": "When confronted by an excited tentacle monster, it's best to just relax and think of _.",
        "numAnswers": 1,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2671,
        "cardType": "Q",
        "text": "A Man, A Woman, and a _.",
        "numAnswers": 1,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2672,
        "cardType": "A",
        "text": "A depressed tentacle monster.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2673,
        "cardType": "A",
        "text": "Pussy spiders.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2674,
        "cardType": "A",
        "text": "The erotic possibilities of duct tape.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2675,
        "cardType": "A",
        "text": "A starsip powered by orgasms.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2676,
        "cardType": "A",
        "text": "A vagina dentata.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2677,
        "cardType": "A",
        "text": "The periodic table of the awesoments.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2678,
        "cardType": "A",
        "text": "An erotic audio drama, complete with moans and groans.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2679,
        "cardType": "A",
        "text": "An addictive aerosol aphrodesiac.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2680,
        "cardType": "A",
        "text": "Debugging nanobot code while hung over.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2681,
        "cardType": "A",
        "text": "Never being able to touch your lover ever again.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2682,
        "cardType": "A",
        "text": "Enormous breasts. I mean, seriously, 'how does she even walk' gigantic.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2683,
        "cardType": "A",
        "text": "The sneaking suspicion that having sex with a theriomorph is actually bestiality.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2684,
        "cardType": "A",
        "text": "Majoring in mad science.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2685,
        "cardType": "A",
        "text": "Balticon!",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2686,
        "cardType": "A",
        "text": "A call on the listener feedback line that turns out to be a wrong number.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2687,
        "cardType": "A",
        "text": "Penis enlargement that actually works.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2688,
        "cardType": "A",
        "text": "Dirty Mad Libs.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2689,
        "cardType": "A",
        "text": "Pregnant sex.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2690,
        "cardType": "A",
        "text": "A killer corset",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2691,
        "cardType": "A",
        "text": "Professor Pinkertoot's Bosom Wax",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2692,
        "cardType": "A",
        "text": "Genderfuckery.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2693,
        "cardType": "A",
        "text": "Zero gravity sex.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2694,
        "cardType": "A",
        "text": "Badly translated Latin.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2695,
        "cardType": "A",
        "text": "Detachable Boobs.",
        "numAnswers": 0,
        "expansion": "Nobilis Reed"
    },
    {
        "id": 2696,
        "cardType": "A",
        "text": "Making up for 10 years of shitty parenting with a PlayStation.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2697,
        "cardType": "A",
        "text": "Giving money and personal information to strangers on the Internet.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2698,
        "cardType": "A",
        "text": "A magical tablet containing a world of unlimited pornography.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2699,
        "cardType": "A",
        "text": "These low, low prices!",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2700,
        "cardType": "A",
        "text": "Piece of shit Christmas cards with no money in them.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2701,
        "cardType": "A",
        "text": "Moses gargling Jesus\'s balls while Shiva and the Buddha penetrate his divine hand holes.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2702,
        "cardType": "A",
        "text": "The Hawaiian goddess Kapo and her flying detachable vagina.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2703,
        "cardType": "A",
        "text": "The shittier, Jewish version of Christmas.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2704,
        "cardType": "A",
        "text": "Swapping bodies with mom for a day.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2705,
        "cardType": "A",
        "text": "Finding out that Santa isn't real.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2706,
        "cardType": "A",
        "text": "Slicing a ham in icy silence.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2707,
        "cardType": "A",
        "text": "The Grinch\'s musty, cum-stained pelt.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2708,
        "cardType": "A",
        "text": "Rudolph's bright red balls.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2709,
        "cardType": "A",
        "text": "Jizzing into Santa\'s beard.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2710,
        "cardType": "A",
        "text": "Breeding elves for their priceless semen.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2711,
        "cardType": "A",
        "text": "The royal afterbirth.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2712,
        "cardType": "A",
        "text": "Congress\'s flaccid penises withering away beneath their suit pants.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2713,
        "cardType": "A",
        "text": "Having a strong opinion about Obamacare.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2714,
        "cardType": "A",
        "text": "A simultaneous nightmare and wet dream starring Sigourney Weaver.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2715,
        "cardType": "A",
        "text": "Being blind and deaf and having no limbs.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2716,
        "cardType": "A",
        "text": "People with cake in their mouths talking about how good cake is.",
        "numAnswers": 0,
        "expansion": "christmas2013"
    },
    {
        "id": 2717,
        "cardType": "Q",
        "text": "But wait, there's more! If you order _ in the next 15 minutes, we\'ll throw in _ absolutely free!",
        "numAnswers": 2,
        "expansion": "christmas2013"
    },
    {
        "id": 2718,
        "cardType": "Q",
        "text": "Because they are forbidden from masturbating, Mormons channel their repressed sexual energy into _.",
        "numAnswers": 1,
        "expansion": "christmas2013"
    },
    {
        "id": 2719,
        "cardType": "Q",
        "text": "Blessed are you, Lord our God, creator of the universe, who has granted us _.",
        "numAnswers": 1,
        "expansion": "christmas2013"
    },
    {
        "id": 2720,
        "cardType": "Q",
        "text": "I really hope my grandma doesn\'t ask me to explain _ again.",
        "numAnswers": 1,
        "expansion": "christmas2013"
    },
    {
        "id": 2721,
        "cardType": "Q",
        "text": "What\'s the one thing that makes an elf instantly ejaculate?",
        "numAnswers": 1,
        "expansion": "christmas2013"
    },
    {
        "id": 2722,
        "cardType": "Q",
        "text": "Here\'s what you can expect for the new year. Out:_. In: _.",
        "numAnswers": 2,
        "expansion": "christmas2013"
    },
    {
        "id": 2723,
        "cardType": "Q",
        "text": "Revealed: Why He Really Resigned! Pope Benedict\'s Secret Struggle with _!",
        "numAnswers": 1,
        "expansion": "christmas2013"
    },
    {
        "id": 2724,
        "cardType": "Q",
        "text": "Kids these days with their iPods and their Internet. In my day, all we needed to pass the time was _.",
        "numAnswers": 1,
        "expansion": "christmas2013"
    },
    {
        "id": 2725,
        "cardType": "Q",
        "text": "GREETINGS HUMANS I AM _ BOT EXECUTING PROGRAM",
        "numAnswers": 1,
        "expansion": "christmas2013"
    },
    {
        "id": 2726,
        "cardType": "A",
        "text": "Sucking the President\'s dick.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2727,
        "cardType": "A",
        "text": "Sunny D! Alright!",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2728,
        "cardType": "A",
        "text": "A mulatoo, an albino, a mosquito, and my libido.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2729,
        "cardType": "A",
        "text": "Log.&trade;",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2730,
        "cardType": "A",
        "text": "Jerking off to a 10-second RealMedia clip.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2731,
        "cardType": "A",
        "text": "Deregulating the mortgage market.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2732,
        "cardType": "A",
        "text": "The Y2K bug.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2733,
        "cardType": "A",
        "text": "Wearing Nicolas Cage\'s face.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2734,
        "cardType": "A",
        "text": "Stabbing the shit out a Capri Sun.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2735,
        "cardType": "A",
        "text": "Kurt Cobain\'s death.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2736,
        "cardType": "A",
        "text": "Freeing Willy.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2737,
        "cardType": "A",
        "text": "Liking big butts and not being able to lie about it.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2738,
        "cardType": "A",
        "text": "The Great Cornholio.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2739,
        "cardType": "A",
        "text": "Pure Moods, Vol. 1.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2740,
        "cardType": "A",
        "text": "Yelling \”girl power!\” and doing a high kick.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2741,
        "cardType": "A",
        "text": "Pamela Anderson\'s boobs running in slow motion.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2742,
        "cardType": "A",
        "text": "Pizza in the morning, pizza in the evening, pizza at supper time.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2743,
        "cardType": "A",
        "text": "Angels interfering in an otherwise fair baseball game.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2744,
        "cardType": "A",
        "text": "Getting caught up in the CROSSFIRE.&trade;",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2745,
        "cardType": "A",
        "text": "Patti Mayonnaise.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2746,
        "cardType": "A",
        "text": "Cool 90s up-in-the-front hair.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2747,
        "cardType": "A",
        "text": "Several Michael Keatons.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2748,
        "cardType": "A",
        "text": "A bus that will explode if it goes under 50 miles per hour.",
        "numAnswers": 0,
        "expansion": "90s"
    },
    {
        "id": 2749,
        "cardType": "Q",
        "text": "Siskel and Ebert have panned _ as \”poorly conceived\” and \”sloppily executed.\”",
        "numAnswers": 1,
        "expansion": "90s"
    },
    {
        "id": 2750,
        "cardType": "Q",
        "text": "Up next on Nickelodeon: \”Clarissa Explains _.\”",
        "numAnswers": 1,
        "expansion": "90s"
    },
    {
        "id": 2751,
        "cardType": "Q",
        "text": "I'm a bitch, I'm a lover, I'm a child, I'm _.",
        "numAnswers": 1,
        "expansion": "90s"
    },
    {
        "id": 2752,
        "cardType": "Q",
        "text": "How did Stella get her groove back?",
        "numAnswers": 1,
        "expansion": "90s"
    },
    {
        "id": 2753,
        "cardType": "Q",
        "text": "Believe it or not, Jim Carrey can do a dead-on impression of _.",
        "numAnswers": 1,
        "expansion": "90s"
    },
    {
        "id": 2754,
        "cardType": "Q",
        "text": "It\'s Morphin\' Time! Mastodon! Pterodactyl! Triceratops! Sabertooth Tiger! _!",
        "numAnswers": 1,
        "expansion": "90s"
    },
    {
        "id": 2755,
        "cardType": "Q",
        "text": "Tonight on SNICK: \”Are You Afraid of _?\”",
        "numAnswers": 1,
        "expansion": "90s"
    },
    {
        "id": 2756,
        "cardType": "A",
        "text": "The black half of Barack Obama.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2757,
        "cardType": "A",
        "text": "The white half of Barack Obama.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2758,
        "cardType": "A",
        "text": "Free ice cream, yo.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2759,
        "cardType": "A",
        "text": "A face full of horse cum.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2760,
        "cardType": "A",
        "text": "Getting caught by the police and going to jail.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2761,
        "cardType": "A",
        "text": "My dead son's baseball glove.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2762,
        "cardType": "A",
        "text": "Ejaculating live bees and the bees are angry.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2763,
        "cardType": "A",
        "text": "Western standards of beauty.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2764,
        "cardType": "A",
        "text": "Getting eaten alive by Guy Fieri.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2765,
        "cardType": "A",
        "text": "Blowjobs for everyone.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2766,
        "cardType": "A",
        "text": "Blackface.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2767,
        "cardType": "A",
        "text": "Butt stuff.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2768,
        "cardType": "A",
        "text": "Some shit-hot guitar licks.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2769,
        "cardType": "A",
        "text": "Social justice warriors with flamethrowers of compassion.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2770,
        "cardType": "A",
        "text": "Deez nuts.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2771,
        "cardType": "A",
        "text": "An unforgettable quinceañera.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2772,
        "cardType": "A",
        "text": "September 11th, 2001.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2773,
        "cardType": "A",
        "text": "Daddy's credit card.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2774,
        "cardType": "A",
        "text": "A one-way ticket to Gary, Indiana.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2775,
        "cardType": "A",
        "text": "An uninterrupted history of imperialism and exploitation.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2776,
        "cardType": "A",
        "text": "P.F. Change himself.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2777,
        "cardType": "A",
        "text": "Cutting off a flamingo\'s legs with garden shears.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2778,
        "cardType": "A",
        "text": "A giant powdery manbaby.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2779,
        "cardType": "A",
        "text": "Anal fissures like you wouldn\'t believe.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2780,
        "cardType": "A",
        "text": "Not believing in giraffes.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2781,
        "cardType": "A",
        "text": "Getting drive-by shot.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2782,
        "cardType": "A",
        "text": "A team of lawyers.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2783,
        "cardType": "A",
        "text": "AIDS monkeys.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2784,
        "cardType": "A",
        "text": "Wearing glasses and sounding smart.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2785,
        "cardType": "A",
        "text": "Slowly easing down onto a cucumber.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2786,
        "cardType": "A",
        "text": "A whole new kind of porn.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2787,
        "cardType": "A",
        "text": "40 acres and a mule.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2788,
        "cardType": "A",
        "text": "Boring vaginal sex.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2789,
        "cardType": "A",
        "text": "Genghis Khan\'s DNA.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2790,
        "cardType": "A",
        "text": "The tiger that killed my father.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2791,
        "cardType": "A",
        "text": "My boyfriend\'s stupid penis.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2792,
        "cardType": "A",
        "text": "Changing a person\'s mind with logic and facts.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2793,
        "cardType": "A",
        "text": "Child support payments.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2794,
        "cardType": "A",
        "text": "The passage of time.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2795,
        "cardType": "A",
        "text": "Going to a high school reunion on ketamine.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2796,
        "cardType": "A",
        "text": "A reason not to commit suicide.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2797,
        "cardType": "A",
        "text": "Russian super-tuberculosis.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2798,
        "cardType": "A",
        "text": "A mouthful of potato salad.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2799,
        "cardType": "A",
        "text": "All these decorative pillows.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2800,
        "cardType": "A",
        "text": "Figuring out how to have sex with a dolphin.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2801,
        "cardType": "A",
        "text": "Being worshipped as the one true God.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2802,
        "cardType": "A",
        "text": "The basic suffering that pervades all of existence.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2803,
        "cardType": "A",
        "text": "The ghost of Marlon Brando.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2804,
        "cardType": "A",
        "text": "Out-of-this-world bazongas.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2805,
        "cardType": "A",
        "text": "Ancient Athenian boy-fucking",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2806,
        "cardType": "A",
        "text": "A crazy little thing called love.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2807,
        "cardType": "A",
        "text": "A zero-risk way to make $2,000 from home.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2808,
        "cardType": "A",
        "text": "Seeing my village burned and my family slaughtered before my eyes.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2809,
        "cardType": "A",
        "text": "Being paralyzed from the neck down.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2810,
        "cardType": "A",
        "text": "Backwards knees.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2811,
        "cardType": "A",
        "text": "Having been dead for a while.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2812,
        "cardType": "A",
        "text": "My first period.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2813,
        "cardType": "A",
        "text": "Vegetarian options.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2814,
        "cardType": "A",
        "text": "The Abercrombie & Fitch lifestyle.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2815,
        "cardType": "A",
        "text": "The unbelievable world of mushrooms.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2816,
        "cardType": "A",
        "text": "Being nine years old.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2817,
        "cardType": "A",
        "text": "The eight gay warlocks who dictate the rules of fashion.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2818,
        "cardType": "A",
        "text": "The swim team, all at once.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2819,
        "cardType": "A",
        "text": "Denzel.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2820,
        "cardType": "A",
        "text": "Unrelenting genital punishment.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2821,
        "cardType": "A",
        "text": "Mom\'s new boyfriend.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2822,
        "cardType": "A",
        "text": "A disappointing salad.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2823,
        "cardType": "A",
        "text": "A powered exoskeleton.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2824,
        "cardType": "A",
        "text": "Ennui.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2825,
        "cardType": "A",
        "text": "Oil!",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2826,
        "cardType": "A",
        "text": "Giant sperm from outer space.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2827,
        "cardType": "A",
        "text": "Doing the right stuff to her nipples.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2828,
        "cardType": "A",
        "text": "Too much cocaine.",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2829,
        "cardType": "A",
        "text": "Seeing things from Hitler\'s perspective",
        "numAnswers": 0,
        "expansion": "CAHe5"
    },
    {
        "id": 2830,
        "cardType": "Q",
        "text": "And today\'s soup is Cream of _.",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2831,
        "cardType": "Q",
        "text": "Now in bookstores: \”The Audacity of _,\” by Barack Obama.",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2832,
        "cardType": "Q",
        "text": "WHOOO! God damn I love _!",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2833,
        "cardType": "Q",
        "text": "Do you lack energy? Does it sometimes feel like the whole world is _? Zoloft.&reg;",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2834,
        "cardType": "Q",
        "text": "Hi, this is Jim from accounting. We noticed a $1,200 charge labeled \”_.\” Can you explain?",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2835,
        "cardType": "Q",
        "text": "Well if _ is good enough for _, it\'s good enough for me.",
        "numAnswers": 2,
        "expansion": "CAHe5"
    },
    {
        "id": 2836,
        "cardType": "Q",
        "text": "Yo\' mama so fat she _!",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2837,
        "cardType": "Q",
        "text": "What killed my boner?",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2838,
        "cardType": "Q",
        "text": "Don\'t forget! Beginning this week, Casual Friday will officially become \”_ Friday.\”",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2839,
        "cardType": "Q",
        "text": "In his farewell address, George Washington famously warned Americans about the dangers of _.",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2840,
        "cardType": "Q",
        "text": "Having the worst day EVER. #_",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2841,
        "cardType": "Q",
        "text": "Get ready for the movie of the summer! One cop plays by the book. The other\'s only interested in one thing: _.",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2842,
        "cardType": "Q",
        "text": "What\'s making things awkward in the sauna?",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2843,
        "cardType": "Q",
        "text": "Life\'s pretty tough in the fast lane. That\'s why I never leave the house without _.",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2844,
        "cardType": "Q",
        "text": "Patient presents with _. Likely a result of _.",
        "numAnswers": 2,
        "expansion": "CAHe5"
    },
    {
        "id": 2845,
        "cardType": "Q",
        "text": "Hi MTV! My name is Kendra, I live in Malibu, I\'m into _, and I love to have a good time.",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2846,
        "cardType": "Q",
        "text": "Help me doctor, I\'ve got _ in my butt!",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2847,
        "cardType": "Q",
        "text": "Why am I broke?",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2848,
        "cardType": "Q",
        "text": "I don\'t mean to brag, but they call me the Michael Jordan of _.",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2849,
        "cardType": "Q",
        "text": "Heed my voice, mortals! I am the god of _, and I will not tolerate _!",
        "numAnswers": 2,
        "expansion": "CAHe5"
    },
    {
        "id": 2850,
        "cardType": "Q",
        "text": "Here at the Academy for Gifted Children, we allow students to explore _ at their own pace.",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2851,
        "cardType": "Q",
        "text": "Well what do you have to say for yourself, Casey? This is the third time you\'ve been sent to the principal\'s office for _.",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2852,
        "cardType": "Q",
        "text": "In his new action comedy, Jackie Chan must fend off ninjas while also dealing with _.",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2853,
        "cardType": "Q",
        "text": "Armani suit: $1,000. Dinner for two at that swanky restaurant: $300. The look on her face when you surprise her with _: priceless.",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2854,
        "cardType": "Q",
        "text": "Do the Dew &reg; with our most extreme flavor yet! Get ready for Mountain Dew _!",
        "numAnswers": 1,
        "expansion": "CAHe5"
    },
    {
        "id": 2855,
        "cardType": "A",
        "text": "A bass drop so huge it tears the starry vault asunder to reveal the face of God.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2856,
        "cardType": "A",
        "text": "Growing up chained to a radiator in perpetual darkness.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2857,
        "cardType": "A",
        "text": "Shitting all over the floor like a bad, bad girl.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2858,
        "cardType": "A",
        "text": "A buttload of candy.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2859,
        "cardType": "A",
        "text": "Sucking all the milk out of a yak.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2860,
        "cardType": "A",
        "text": "Bullets.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2861,
        "cardType": "A",
        "text": "A man who is so cool that he rides on a motorcycle.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2862,
        "cardType": "A",
        "text": "Sudden penis loss.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2863,
        "cardType": "A",
        "text": "Getting all offended.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2864,
        "cardType": "A",
        "text": "Crying and shitting and eating spaghetti.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2865,
        "cardType": "A",
        "text": "One unforgettable night of passion.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2866,
        "cardType": "A",
        "text": "Being popular and good at sports.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2867,
        "cardType": "A",
        "text": "Filling a man\'s anus with concrete.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2868,
        "cardType": "A",
        "text": "Two whales fucking the shit out of eachother.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2869,
        "cardType": "A",
        "text": "Cool, releatable cancer teens.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2870,
        "cardType": "A",
        "text": "The amount of gay I am.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2871,
        "cardType": "A",
        "text": "A possible Muslim.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2872,
        "cardType": "A",
        "text": "Unsheathing my massive horse cock.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2873,
        "cardType": "A",
        "text": "A bowl of gourds.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2874,
        "cardType": "A",
        "text": "The male gaze.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2875,
        "cardType": "A",
        "text": "The power of the Dark Side.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2876,
        "cardType": "A",
        "text": "Ripping a dog in half.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2877,
        "cardType": "A",
        "text": "A constant need for validation.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2878,
        "cardType": "A",
        "text": "Meaningless sex.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2879,
        "cardType": "A",
        "text": "Such a big boy.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2880,
        "cardType": "A",
        "text": "Throwing stones at a man until he dies.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2881,
        "cardType": "A",
        "text": "Cancer.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2882,
        "cardType": "A",
        "text": "Like a million alligators.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2883,
        "cardType": "A",
        "text": "Eating together like a god damn family for once.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2884,
        "cardType": "A",
        "text": "Cute boys.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2885,
        "cardType": "A",
        "text": "Pussy.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2886,
        "cardType": "A",
        "text": "Being a terrible mother.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2887,
        "cardType": "A",
        "text": "Never having sex again.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2888,
        "cardType": "A",
        "text": "A pizza guy who fucked up.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2889,
        "cardType": "A",
        "text": "A whole lotta woman.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2890,
        "cardType": "A",
        "text": "The all-new Nissan Pathfinder with 0.9% APR financing!",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2891,
        "cardType": "A",
        "text": "A peyote-fueled vision quest.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2892,
        "cardType": "A",
        "text": "Kale.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2893,
        "cardType": "A",
        "text": "Breastfeeding a ten year old.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2894,
        "cardType": "A",
        "text": "Crippling social anxiety.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2895,
        "cardType": "A",
        "text": "Immortality cream.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2896,
        "cardType": "A",
        "text": "Texas.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2897,
        "cardType": "A",
        "text": "Teaching a girl how to handjob the penis.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2898,
        "cardType": "A",
        "text": "A turd.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2899,
        "cardType": "A",
        "text": "Shapes and colors.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2900,
        "cardType": "A",
        "text": "Whatever you wish, mother.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2901,
        "cardType": "A",
        "text": "The haunting stare of an Iraqi child.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2902,
        "cardType": "A",
        "text": "Robots who just want to party.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2903,
        "cardType": "A",
        "text": "A self-microwaving burrito.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2904,
        "cardType": "A",
        "text": "Forgetting grandma\'s first name.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2905,
        "cardType": "A",
        "text": "Our new Buffalo Chicken Dippers&reg;!",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2906,
        "cardType": "A",
        "text": "Treasures beyond your wildest dreams.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2907,
        "cardType": "A",
        "text": "Getting shot out of a cannon.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2908,
        "cardType": "A",
        "text": "The sweet song of sword against and the braying of mighty war beasts.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2909,
        "cardType": "A",
        "text": "Walking into a glass door.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2910,
        "cardType": "A",
        "text": "The color \"puce\".",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2911,
        "cardType": "A",
        "text": "Every ounce of charisma left in Mick Jagger\'s tired body.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2912,
        "cardType": "A",
        "text": "The eighth graders.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2913,
        "cardType": "A",
        "text": "Setting my balls on fire and cartwheeling to Ohio.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2914,
        "cardType": "A",
        "text": "The dentist.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2915,
        "cardType": "A",
        "text": "Gwyneth Paltrow\'s opinions.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2916,
        "cardType": "A",
        "text": "Turning the rivers red with the blood of infidels.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2917,
        "cardType": "A",
        "text": "Rabies.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2918,
        "cardType": "A",
        "text": "Important news about Taylor Swift.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2919,
        "cardType": "A",
        "text": "Ejaculating inside another man\'s wife.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2920,
        "cardType": "A",
        "text": "Owls, the perfect predator.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2921,
        "cardType": "A",
        "text": "Being John Malkovich.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2922,
        "cardType": "A",
        "text": "Bathing in moonsblood and dancing around the ancient oak.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2923,
        "cardType": "A",
        "text": "An oppressed people with a vibrant culture.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2924,
        "cardType": "A",
        "text": "An overwhelming variety of cheeses.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2925,
        "cardType": "A",
        "text": "Reading the entire End-User License Agreement.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2926,
        "cardType": "A",
        "text": "Morpheus.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2927,
        "cardType": "A",
        "text": "Peeing into a girl\'s butt to make a baby.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2928,
        "cardType": "A",
        "text": "Generally having no idea of what\'s going on.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2929,
        "cardType": "A",
        "text": "No longer finding any Cards Against Humanity card funny.",
        "numAnswers": 0,
        "expansion": "CAHe6"
    },
    {
        "id": 2930,
        "cardType": "Q",
        "text": "I work my ass off all day for this family, and this is what I come home to? _!?",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2931,
        "cardType": "Q",
        "text": "I have a strict policy. First date, dinner. Second date, kiss. Third date, _.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2932,
        "cardType": "Q",
        "text": "When I was a kid, we used to play Cowboys and _.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2933,
        "cardType": "Q",
        "text": "This is America. If you don\'t work hard, you don\'t succeed. I don\'t care if you\'re black, white, purple, or _.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2934,
        "cardType": "Q",
        "text": "You Won\'t Believe These 15 Hilarious _ Bloopers!",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2935,
        "cardType": "Q",
        "text": "James is a lonely boy. But when he discovers a secret door in his attic, he meets a magical new friend: _.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2936,
        "cardType": "Q",
        "text": "Don\'t worry kid. It gets better. I\'ve been living with _ for 20 years.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2937,
        "cardType": "Q",
        "text": "My grandfather worked his way up from nothing. When he came to this country, all he had was the shoes on his feet and _.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2938,
        "cardType": "Q",
        "text": "Behind every powerful man is _.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2939,
        "cardType": "Q",
        "text": "You are not alone. Millions of Americans struggle with _ every day.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2940,
        "cardType": "Q",
        "text": "Come to Dubai, where you can relax in our world famous spas, experience the nightlife, or simply enjoy _ by the poolside.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2941,
        "cardType": "Q",
        "text": "\"This is madness.\" \"No, THIS IS _!\"",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2942,
        "cardType": "Q",
        "text": "Listen Gary, I like you. But if you want that corner office, you\'re going to have to show me _.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2943,
        "cardType": "Q",
        "text": "I went to the desert and ate of the peyote cactus. Turns out my spirit animal is _.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2944,
        "cardType": "Q",
        "text": "And would you like those buffalo wings mild, hot, or _?",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2945,
        "cardType": "Q",
        "text": "The six things I could never do without: oxygen, Facebook, chocolate, Netflix, friends, and _ LOL!",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2946,
        "cardType": "Q",
        "text": "Why won\'t you make love to me anymore? Is it _?",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2947,
        "cardType": "Q",
        "text": "Puberty is a time of change. You might notice hair growing in new places. You might develop an interest in _. This is normal.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2948,
        "cardType": "Q",
        "text": "I\'m sorry, Mrs. Chen, but there was nothing we could do. At 4:15 this morning, your son succumbed to _.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2949,
        "cardType": "Q",
        "text": "I\'m Miss Tennessee, and if I could make the world better by changing one thing, I would get rid of _.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2950,
        "cardType": "Q",
        "text": "Tonight we will have sex. And afterwards, If you\'d like, a little bit of _.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2951,
        "cardType": "Q",
        "text": "Everybody join hands and close your eyes. Do you sense that? That\'s the presence of _ in this room.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2952,
        "cardType": "Q",
        "text": "To become a true Yanomamo warrior, you must prove that you can withstand _ without crying out.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2953,
        "cardType": "Q",
        "text": "Y\'all ready to get this thing started? I\'m Nick Cannon, and this is America\'s Got _.",
        "numAnswers": 1,
        "expansion": "CAHe6"
    },
    {
        "id": 2954,
        "cardType": "Q",
        "text": "If you had to describe the Card Czar, using only one of the cards in your hand, which one would it be?",
        "numAnswers": 1,
        "expansion": "CAHe6"
    }
]

const genres = [
    'Base',
    'CAHe1',
    'CAHe2',
    'CAHgrognards',
    'CAHweeaboo',
    'CAHxmas',
    'NEIndy',
    'NSFH',
    'CAHe3',
    'Image1',
    'GOT',
    'PAXP13',
    'PAXE13',
    'HACK',
    'CAHe4',
    'Box',
    'Gallifrey',
    'Alternia',
    'Ladies Against Humanity',
    'Canadian Conversion Kit',
    'Nobilis Reed',
    'christmas2013',
    '90s',
    'CAHe5',
    'CAHe6'
]

const filter = base => type => card => card.expansion === base && card.cardType === type

function makeCards(base) {
    return type => JSON.stringify(cards.filter(filter(base)(type)).map(card => Object.assign({
        text: card.text,
        genre: `JSON Against Humanity - ${base}`
    }, (card.numAnswers ? {
        pick: card.numAnswers
    } : {}))))
}

function makeGenres(genres) {
    return JSON.stringify(genres.map(genre => ({
        description: `JSON Against Humanity - ${genre}`,
        credit: 'https://github.com/samurailink3/hangouts-against-humanity'
    })))
}

function makeCardFixtures(base) {
    return type => JSON.stringify(cards.filter(filter(base)(type)).map((card, pk) => ({
      model: `api.${type === 'Q' ? 'blackcard' : 'whitecard'}`,
      pk,
      fields: Object.assign({
          text: card.text,
          genre: `JSON Against Humanity - ${base}`
      }, (card.numAnswers ? {
          pick: card.numAnswers
      } : {}))
    })))
}

function makeGenreFixtures(genres) {
    return JSON.stringify(genres.map((genre, pk) => ({
      model: 'api.genre',
      pk,
      fields: {
        description: `JSON Against Humanity - ${genre}`,
        credit: 'https://github.com/samurailink3/hangouts-against-humanity'
      }
    })))
}

function getDirectories(type) {
  const baseDir = type === 'fixtures' ? 'api/fixtures/cah' : type
  const genreDir = path.join(__dirname, `../${baseDir}/genres`)
  const blackCardDir = path.join(__dirname, `../${baseDir}/blackcards`)
  const whiteCardDir = path.join(__dirname, `../${baseDir}/whitecards`)

  return [genreDir, blackCardDir, whiteCardDir]
}

async function deleteDirectories(...directories) {
  return Promise.all(directories.map(dir => fs.promises.rm(dir, { maxRetries: 5, retryDelay: 2000, recursive: true, force: true })))
}

async function makeDirectories(...directories) {
  await Promise.all(directories.map(dir => fs.promises.mkdir(dir, { recursive: true })))
}

async function createFixtures(type) {
  const isData = type === 'data'
  const directories = getDirectories(type)
  const [genreDir, blackCardDir, whiteCardDir] = directories

  await deleteDirectories(...directories)
  await makeDirectories(...directories)

  Promise.all([
    fs.promises.writeFile(path.join(genreDir, `${credit}-genres.json`), isData ? makeGenres(genres) : makeGenreFixtures(genres))
      .then(() => process.stdin.write('genre written\n')),
    genres.map(base => {
      fs.promises.writeFile(path.join(blackCardDir, `${credit}-${base}.json`), isData ? makeCards(base)('Q') : makeCardFixtures(base)('Q'))
        .then(() => process.stdin.write(`${base} black cards written\n`))
      fs.promises.writeFile(path.join(whiteCardDir, `${credit}-${base}.json`), isData ? makeCards(base)('A') : makeCardFixtures(base)('A'))
        .then(() => process.stdin.write(`${base} white cards written\n`))
    })
  ])
}

function action({ type, fixtures, data })  {
  return createFixtures(fixtures ? 'fixtures' : data ? 'data' : type)
}

// Only run this module if file is loaded directly (eg `node server.js`)
// module loaded by something else eg. test or cyclic dependency
// Fixes error: 'Trying to open unclosed connection.'
if (require.main === module) {
  const { Command } = require('commander');
  const program = new Command('load-fixtures')
  program.version('0.0.2')
    .option('-t, --type <type>', 'make fixtures or data, defaults to fixtures', 'fixtures')
    .option('-f, --fixtures', 'make fixtures')
    .option('-d, --data', 'make data')
    .action(action)
    .parse(process.argv)
}

module.exports.createFixtures = createFixtures
