const songDatabase = [
    { title: "3D", src: "https://pavansweb.github.io/songs/3D.mp3", image: "https://i.ytimg.com/vi/h_KLwLcXOGg/sddefault.jpg", category: "Romantic Songs" , author : "Bts" },
    { title: "Agora hills", src: "https://pavansweb.github.io/songs/Agora%20Hills%20Doja%20Cat.mp3", image: "https://i.ytimg.com/vi/7Vd6K6i51WQ/maxresdefault.jpg", category: "English Songs", author :"Doja Cat " },
    { title: "Aloha", src: "https://pavansweb.github.io/songs/Aloha.mp3", image: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/bd/47/df/bd47dfc8-d867-f767-158e-b025554446c2/5054197397530.jpg/400x400cc.jpg", category: "Phonk Songs", author :" " },
    { title: "Avoid Us", src: "https://pavansweb.github.io/songs/Avoid%20Us.mp3", image: "https://a10.gaanacdn.com/gn_img/albums/NOXWVRgWkq/XWVRqq7gWk/size_l.jpg", category: "Phonk Songs", author :" " },
    { title: "Beliver", src: "https://pavansweb.github.io/songs/Beliver.mp3", image: "https://i.ytimg.com/vi/W0DM5lcj6mw/maxresdefault.jpg", category: "English Songs", author :" " },
    { title: "Bones", src: "https://pavansweb.github.io/songs/bones.mp3", image: "https://c.saavncdn.com/038/Bones-English-2022-20220311113603-500x500.jpg", category: "English Songs", author :" " },
    { title: "Boys a liar pt 2 ", src: "https://pavansweb.github.io/songs/Boys%20a%20liar%20pt%202%20by%20pink%20pamtresa%20and%20ice%20spice.mp3", image: "https://i.ytimg.com/vi/e1dJoKCU4Pw/maxresdefault.jpg", category: "Romantic Songs", author :"Pink Pamtresa and ice spice " },
    { title: "Dear to me", src: "https://pavansweb.github.io/songs/Dear%20to%20me.mp3", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Ce3f6rsaSfHKlsp30yf4nwQ_c0BRz_6hq9UBzCUyN87i4SHPvbQzzd_DYonFomR8bi4&usqp=CAU", category: "Romantic Songs", author :" " },
    { title: "Die for me ", src: "https://pavansweb.github.io/songs/Die%20for%20me%20by%20weekend%20and%20ariana%20grande.mp3", image: "https://i1.sndcdn.com/artworks-eO1lrJH40L9wYlXk-PRJF4A-t500x500.jpg", category: "Romantic Songs", author :" weekend and ariana grande " },
    { title: "Dream 2", src: "https://pavansweb.github.io/songs/Dream%202.mp3", image: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/bd/47/df/bd47dfc8-d867-f767-158e-b025554446c2/5054197397530.jpg/400x400cc.jpg", category: "Phonk Songs", author :" " },
    { title: "Escapism", src: "https://pavansweb.github.io/songs/Escapism.mp3", image: "https://i.ytimg.com/vi/0EBw-CWc4Uw/maxresdefault.jpg", category: "English Songs", author :" " },
    { title: "FIFTY FIFTY - Cupid ", src: "https://pavansweb.github.io/songs/FIFTY%20FIFTY%20-%20Cupid.mp3", image: "https://upload.wikimedia.org/wikipedia/en/a/a6/Fifty_Fifty_-_The_Beginning_Cupid.png", category: "Romantic Songs", author :" " },
    { title: "GigaChad", src: "https://pavansweb.github.io/songs/GigaChad.mp3", image: "https://i1.sndcdn.com/avatars-cyOmdd2Qj9sUWzjn-Zv2vgQ-t500x500.jpg", category: "Phonk Songs", author :" " },
    { title: "Kesariya", src: "https://pavansweb.github.io/songs/Kesariya.mp3", image: "https://qph.cf2.quoracdn.net/main-qimg-a91c535a3465efbb4080ddd8185874f6-lq", category: "Hollywood Songs", author :" " },
    { title: "Live Another Day", src: "https://pavansweb.github.io/songs/Live%20another%20day.mp3", image: "https://i1.sndcdn.com/artworks-xIKYFG7WxtMucLZg-WXHkEw-t500x500.jpg", category: "Phonk Songs", author :" " },
    { title: "Malang Sajna", src: "https://pavansweb.github.io/songs/Malang%20Sajna.mp3", image: "https://i.ytimg.com/vi/Xd8Fazf-Z3Q/maxresdefault.jpg", category: "Hollywood Songs", author :" " },
    { title: "Melting", src: "https://pavansweb.github.io/songs/Melting.mp3", image: "https://i.ytimg.com/vi/0nZtsF-p40E/maxresdefault.jpg", category: "English Songs", author :" " },
    { title: "Metamorphisis", src: "https://pavansweb.github.io/songs/Metamorphisis.mp3", image: "https://c.saavncdn.com/221/METAMORPHOSIS-English-2021-20220215012012-500x500.jpg", category: "Phonk Songs", author :" " },
    { title: "Moonlight", src: "https://pavansweb.github.io/songs/Moonlight%20-%20Harnoor.mp3", image: "https://i.scdn.co/image/ab67616d0000b2731b2aae3511dbbee4d92642df", category: "Romantic Songs", author :" " },
    { title: "Moye moye", src: "https://pavansweb.github.io/songs/Moye%20moye.mp3", image: "https://i.tribune.com.pk/media/images/moyemoyeserbina-(2)1702448704-0/moyemoyeserbina-(2)1702448704-0-400x230.webp", category: "English Songs", author :" " },
    { title: "Murder in my mind", src: "https://pavansweb.github.io/songs/Murder%20in%20my%20mind.mp3", image: "https://img.youtube.com/vi/w-sQRS-Lc9k/0.jpg", category: "Phonk Songs", author :" " },
    { title: "Neon blade", src: "https://pavansweb.github.io/songs/Neon%20blade.mp3", image: "https://i.scdn.co/image/ab67616d0000b27300c44aebaaa37ef468709f01", category: "Phonk Songs", author :" " },
    { title: "On Fire", src: "https://pavansweb.github.io/songs/On%20Fire.mp3", image: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/bd/47/df/bd47dfc8-d867-f767-158e-b025554446c2/5054197397530.jpg/400x400cc.jpg", category: "Phonk Songs", author :" " },
    { title: "Raataan Lambiyan", src: "https://pavansweb.github.io/songs/Raataan%20Lambiyan.mp3", image: "https://i1.sndcdn.com/artworks-dlYooJJUpkDHDt45-PDy2NQ-t500x500.jpg", category: "Hollywood Songs", author :" " },
    { title: "Sad girls love money", src: "https://pavansweb.github.io/songs/Sad%20Girlz%20Luv%20Money%20(Remix).mp3", image: "https://upload.wikimedia.org/wikipedia/en/a/a2/Amaarae_-_Sad_Girlz_Luv_Money_%28Remix%29.png", category: "Hollywood Songs", author :" " },
    { title: "Sahara", src: "https://pavansweb.github.io/songs/Sahara.mp3", image: "https://i1.sndcdn.com/artworks-D40MKLgYT5JJ9XMO-TnPyXw-t500x500.jpg", category: "Phonk Songs", author :" " },
    { title: "Sataranga", src: "https://pavansweb.github.io/songs/Sataranga.mp3", image: "https://i.ytimg.com/vi/HrnrqYxYrbk/mqdefault.jpg", category: "Hollywood Songs", author :" " },
    { title: "Telepathy", src: "https://pavansweb.github.io/songs/Telepathy%20-%20Kali%20Uchis.mp3", image: "https://i1.sndcdn.com/artworks-y5l3z8g5FXoCRzJl-ua72Ig-t500x500.jpg", category: "Hollywood Songs", author :" - Kali Uchis " },
    { title: "Unity", src: "https://pavansweb.github.io/songs/Unity.mp3", image: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/bd/47/df/bd47dfc8-d867-f767-158e-b025554446c2/5054197397530.jpg/400x400cc.jpg", category: "Phonk Songs", author :" " },
    { title: "Valentine", src: "https://pavansweb.github.io/songs/Valentine%20-%20Laufey.mp3", image: "https://i.ytimg.com/vi/GsmQt-2xpw0/maxresdefault.jpg", category: "Hollywood Songs", author :"  - Laufey " },
    { title: "Worth nothing", src: "https://pavansweb.github.io/songs/WORTH%20NOTHING.mp3", image: "https://a10.gaanacdn.com/gn_img/albums/JD2KJAbOLw/2KJyPdN1bO/size_m.jpg", category: "Phonk Songs", author :" " },
    { title: "Paint The Town Red", src: "https://pavansweb.github.io/songs/Paint%20The%20Town%20Red.mp3", image: "https://i.ytimg.com/vi/UQYyt8x2nPQ/maxresdefault.jpg", category: "English Songs", author :" " },
    { title: "Time Traveller", src: "https://pavansweb.github.io/songs/Time%20Traveller.mp3", image: "https://i.ytimg.com/vi/RoQU0wfZ5Uk/sddefault.jpg", category: "English Songs", author :" " }

];


export default songDatabase;
