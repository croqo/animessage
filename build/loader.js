let Config = {
    "ninja": {
        "foreground": {
            "lottie": "https://xperiencify.com/files/json/fg-ninja.json",
            "type": "inbox",
            "delay": 3000,
            "text": "Congratulations!",
            "length": 10000
        },
        "background": {
            "lottie": "https://xperiencify.com/files/json/bg-hills.json",
            "type": "surface",
            "delay": 3000,
            "audio": "https://xperiencify.com/files/mp3/mp3-ninja.mp3",
            "length": 11000
        }
    },
    "UDK3": {
        "foreground": {
            "lottie": "https://assets1.lottiefiles.com/private_files/lf30_yjzne692.json",
            "type": "inbox",
            "text": "Yet another message",
            "loop": false,
            "delay": 4000,
            "length": 8000
        },
        "background": {
            "lottie": "https://assets4.lottiefiles.com/packages/lf20_f755rjxp.json",
            "type": "surface",
            "scaling": "y",
            "audio": "https://croqo.xyz/storage/app/media/rsac-pozvoni-mne.mp3",
            "length": 12000
        }
    },
    "Ft4k": {
        "foreground": {
            "lottie": "https://assets7.lottiefiles.com/private_files/lf30_hilbd2uq.json",
            "type": "inbox",
            "delay": 1000,
            "length": 13000
        },
        "background": {
            "lottie": "https://assets7.lottiefiles.com/packages/lf20_hluo7ags.json",
            "type": "surface",
            "audio": "https://croqo.xyz/storage/app/media/marsheaux-computer-love-unplugged.mp3",
            "length": 14000
        }
    }
};
let script = document.createElement('script');
script.src = 'index.js';
document.body.append(script);