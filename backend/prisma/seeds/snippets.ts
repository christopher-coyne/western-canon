import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedSnippets(works: any[]) {
  const workMap = new Map(works.map((work) => [work.title, work.id]));

  const snippets = [
    // Pride and Prejudice snippets
    {
      content: `[Enter suddenly and in haste a Messenger from the Mountain.]

MESSENGER:
Great Pentheus, Lord of all this Theban land,
I come from high Kithaeron, where the frore
Snow spangles gleam and cease not evermore...

PENTHEUS:
And what of import may thy coming bring?

MESSENGER:
I have seen the Wild White Women there, O King,
Whose fleet limbs darted arrow-like but now
From Thebes away, and come to tell thee how
They work strange deeds and passing marvel. Yet
I first would learn thy pleasure. Shall I set
My whole tale forth, or veil the stranger part?
Yea, Lord, I fear the swiftness of thy heart,
Thine edged wrath and more than royal soul.

PENTHEUS:
Thy tale shall nothing scathe thee. Tell the whole.
It skills not to be wroth with honesty.
Nay, if thy news of them be dark, 'tis he
Shall pay it, who bewitched and led them on.

MESSENGER:
Our herded kine were moving in the dawn
Up to the peaks, the greyest, coldest time,
When the first rays steal earthward, and the rime
Yields, when I saw three bands of them. The one
Autonoë led, one Ino, one thine own
Mother, Agâvê. There beneath the trees
Sleeping they lay, like wild things flung at ease
In the forest; one half sinking on a bed
Of deep pine greenery; one with careless head
Amid the fallen oak leaves; all most cold
In purity--not as thy tale was told
Of wine-cups and wild music and the chase
For love amid the forest's loneliness.

Then rose the Queen Agâvê suddenly
Amid her band, and gave the God's wild cry,
"Awake, ye Bacchanals! I hear the sound
Of hornèd kine. Awake ye!" Then, all round,
Alert, the warm sleep fallen from their eyes,
A marvel of swift ranks I saw them rise,
Dames young and old, and gentle maids unwed
Among them. O'er their shoulders first they shed
Their tresses, and caught up the fallen fold
Of mantles where some clasp had loosened hold,
And girt the dappled fawn-skins in with long
Quick snakes that hissed and writhed with quivering tongue.

And one a young fawn held, and one a wild
Wolf cub, and fed them with white milk, and smiled
In love, young mothers with a mother's breast
And babes at home forgotten! Then they pressed
Wreathed ivy round their brows, and oaken sprays
And flowering bryony. And one would raise
Her wand and smite the rock, and straight a jet
Of quick bright water came. Another set
Her thyrsus in the bosomed earth, and there
Was red wine that the God sent up to her,
A darkling fountain. And if any lips
Sought whiter draughts, with dipping finger-tips
They pressed the sod, and gushing from the ground
Came springs of milk. And reed-wands ivy-crowned
Ran with sweet honey, drop by drop. O King,
Hadst thou been there, as I, and seen this thing,
With prayer and most high wonder hadst thou gone
To adore this God whom now thou rail'st upon!

Howbeit, the kine-wardens and shepherds straight
Came to one place, amazed, and held debate;
And one being there who walked the streets and scanned
The ways of speech, took lead of them whose hand
Knew but the slow soil and the solemn hill,
And flattering spoke, and asked: "Is it your will,
Masters, we stay the mother of the King,
Agâvê, from her lawless worshipping,
And win us royal thanks?" And this seemed good
To all; and through the branching underwood
We hid us, cowering in the leaves. And there
Through the appointed hour they made their prayer
And worship of the Wand, with one accord
Of heart and cry--"Iacchos, Bromios, Lord,
God of God born!" And all the mountain felt,
And worshipped with them; and the wild things knelt
And ramped and gloried, and the wilderness
Was filled with moving voices and dim stress.

Soon, as it chanced, beside my thicket-close
The Queen herself passed dancing, and I rose
And sprang to seize her. But she turned her face
Upon me: "Ho, my rovers of the chase,
My wild White Hounds, we are hunted! Up, each rod
And follow, follow, for our Lord and God!"
Thereat, for fear they tear us, all we fled
Amazed; and on, with hand unweaponèd
They swept toward our herds that browsed the green
Hill grass. Great uddered kine then hadst thou seen
Bellowing in sword-like hands that cleave and tear,
A live steer riven asunder, and the air
Tossed with rent ribs or limbs of cloven tread,
And flesh upon the branches, and a red
Rain from the deep green pines. Yea, bulls of pride,
Horns swift to rage, were fronted and aside
Flung stumbling, by those multitudinous hands
Dragged pitilessly. And swifter were the bands
Of garbèd flesh and bone unbound withal
Than on thy royal eyes the lids may fall.

Then on like birds, by their own speed upborne,
They swept toward the plains of waving corn
That lie beside Asopus' banks, and bring
To Thebes the rich fruit of her harvesting.
On Hysiae and Erythrae that lie nursed
Amid Kithaeron's bowering rocks, they burst
Destroying, as a foeman's army comes.
They caught up little children from their homes,
High on their shoulders, babes unheld, that swayed
And laughed and fell not; all a wreck they made;
Yea, bronze and iron did shatter, and in play
Struck hither and thither, yet no wound had they;
Caught fire from out the hearths, yea, carried hot
Flames in their tresses and were scorchèd not!

The village folk in wrath took spear and sword,
And turned upon the Bacchae. Then, dread Lord,
The wonder was. For spear nor barbèd brand
Could scathe nor touch the damsels; but the Wand,
The soft and wreathèd wand their white hands sped,
Blasted those men and quelled them, and they fled
Dizzily. Sure some God was in these things!

And the holy women back to those strange springs
Returned, that God had sent them when the day
Dawned, on the upper heights; and washed away
The stain of battle. And those girdling snakes
Hissed out to lap the waterdrops from cheeks
And hair and breast.

Therefore I counsel thee,
O King, receive this Spirit, whoe'er he be,
To Thebes in glory. Greatness manifold
Is all about him; and the tale is told
That this is he who first to man did give
The grief-assuaging vine. Oh, let him live;
For if he die, then Love herself is slain,
And nothing joyous in the world again!`,
      analysis:
        "This famous opening line sets up the novel's central theme of marriage and social status, while also establishing the narrator's ironic voice.",
      workId: workMap.get("Pride and Prejudice"),
    },
    {
      content:
        "In vain I have struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.",
      analysis:
        "Mr. Darcy's first proposal to Elizabeth, revealing his internal conflict between his genuine feelings and his sense of social propriety.",
      workId: workMap.get("Pride and Prejudice"),
    },
    // The Metamorphosis snippets
    {
      content:
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      analysis:
        "The iconic opening line that immediately establishes the story's surreal premise and matter-of-fact narrative style.",
      workId: workMap.get("The Metamorphosis"),
    },
    {
      content:
        "The cleaning woman always called him 'that old dung beetle' to his face... 'Come and 'ave a look at this, it's dead; it's lying there, dead as a doornail!'",
      analysis:
        "This passage shows how Gregor has been completely dehumanized, even by the household staff.",
      workId: workMap.get("The Metamorphosis"),
    },
    // One Hundred Years of Solitude snippets
    {
      content:
        "Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.",
      analysis:
        "The novel's opening line masterfully combines the magical (the discovery of ice) with the political (the firing squad), while also playing with time in a way characteristic of the entire novel.",
      workId: workMap.get("One Hundred Years of Solitude"),
    },
    {
      content: "Time was not passing...it was turning in a circle.",
      analysis:
        "This quote captures one of the novel's central themes: the cyclical nature of time and history in the Buendía family.",
      workId: workMap.get("One Hundred Years of Solitude"),
    },
    // Mrs Dalloway snippets
    {
      content: "Mrs. Dalloway said she would buy the flowers herself.",
      analysis:
        "The opening line introduces both the protagonist and the stream-of-consciousness style that characterizes the novel.",
      workId: workMap.get("Mrs Dalloway"),
    },
    {
      content:
        "She had the perpetual sense, as she watched the taxi cabs, of being out, out, far out to sea and alone; she always had the feeling that it was very, very dangerous to live even one day.",
      analysis:
        "This passage reveals Clarissa's existential anxiety beneath her superficially conventional life.",
      workId: workMap.get("Mrs Dalloway"),
    },
    // Great Expectations snippets
    {
      content:
        "My father's family name being Pirrip, and my Christian name Philip, my infant tongue could make of both names nothing longer or more explicit than Pip. So, I called myself Pip, and came to be called Pip.",
      analysis:
        "The opening lines introduce Pip's identity and voice, setting up the novel's first-person narrative.",
      workId: workMap.get("Great Expectations"),
    },
    {
      content:
        "In a word, I was too cowardly to do what I knew to be right, as I had been too cowardly to avoid doing what I knew to be wrong.",
      analysis:
        "This quote reveals Pip's moral struggle and self-awareness, central themes in the novel.",
      workId: workMap.get("Great Expectations"),
    },
    // Emma snippets
    {
      content:
        "Emma Woodhouse, handsome, clever, and rich, with a comfortable home and happy disposition, seemed to unite some of the best blessings of existence; and had lived nearly twenty-one years in the world with very little to distress or vex her.",
      analysis:
        "The opening lines perfectly establish Emma's privileged position and hint at her lack of real-world experience, setting up the novel's exploration of her character growth.",
      workId: workMap.get("Emma"),
    },
    // Sense and Sensibility snippets
    {
      content:
        "The more I know of the world, the more I am convinced that I shall never see a man whom I can really love. I require so much!",
      analysis:
        "Marianne's romantic idealism contrasts with her sister's pragmatism, highlighting the novel's central tension between sense and sensibility.",
      workId: workMap.get("Sense and Sensibility"),
    },
    // The Trial snippets
    {
      content:
        "Someone must have slandered Josef K., for one morning, without having done anything truly wrong, he was arrested.",
      analysis:
        "The opening line introduces the novel's themes of bureaucratic oppression and arbitrary justice.",
      workId: workMap.get("The Trial"),
    },
    // Love in the Time of Cholera snippets
    {
      content:
        "He allowed himself to be swayed by his conviction that human beings are not born once and for all on the day their mothers give birth to them, but that life obliges them over and over again to give birth to themselves.",
      analysis:
        "This passage reflects the novel's theme of love's capacity for renewal and transformation over time.",
      workId: workMap.get("Love in the Time of Cholera"),
    },
    // To the Lighthouse snippets
    {
      content:
        "For now she need not think about anybody. She could be herself, by herself. And that was what now she often felt the need of - to think; well, not even to think. To be silent; to be alone.",
      analysis:
        "This excerpt captures Mrs. Ramsay's interior life and the novel's exploration of consciousness and solitude.",
      workId: workMap.get("To the Lighthouse"),
    },
    // Orlando snippets
    {
      content:
        "As long as she thinks of a man, nobody objects to a woman thinking.",
      analysis:
        "This ironic observation highlights the novel's critique of gender roles and societal expectations.",
      workId: workMap.get("Orlando: A Biography"),
    },
    // The Castle snippets
    {
      content:
        "It was late evening when K. arrived. The village lay deep in snow. The Castle hill was hidden, veiled in mist and darkness, nor was there even a glimmer of light to show that a castle was there.",
      analysis:
        "The opening sets the mysterious and oppressive atmosphere that pervades the entire novel.",
      workId: workMap.get("The Castle"),
    },
    // A Tale of Two Cities snippets
    {
      content:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness...",
      analysis:
        "The famous opening lines establish the novel's central theme of duality and the contrasting nature of the historical period.",
      workId: workMap.get("A Tale of Two Cities"),
    },
    // Chronicle of a Death Foretold snippets
    {
      content:
        "On the day they were going to kill him, Santiago Nasar got up at five-thirty in the morning to wait for the boat the bishop was coming on.",
      analysis:
        "The opening line exemplifies García Márquez's technique of revealing the outcome immediately while maintaining suspense through the details.",
      workId: workMap.get("Chronicle of a Death Foretold"),
    },
    // Oliver Twist snippets
    {
      content: "Please, sir, I want some more.",
      analysis:
        "This simple but powerful line captures both Oliver's innocence and the novel's critique of Victorian workhouse conditions and social inequality.",
      workId: workMap.get("Oliver Twist"),
    },
    // More from Pride and Prejudice
    {
      content: "Till this moment I never knew myself.",
      analysis:
        "Elizabeth's moment of self-realization, showing how prejudice had clouded her judgment and highlighting the novel's theme of self-discovery.",
      workId: workMap.get("Pride and Prejudice"),
    },
    // More from The Trial
    {
      content:
        "Logic may indeed be unshakeable, but it cannot withstand a man who is determined to live.",
      analysis:
        "This quote emphasizes the conflict between bureaucratic rationality and human will to survive, a central theme in the novel.",
      workId: workMap.get("The Trial"),
    },
    // More from Emma
    {
      content:
        "I cannot make speeches, Emma. If I loved you less, I might be able to talk about it more.",
      analysis:
        "Mr. Knightley's declaration of love shows true feeling triumphing over social artifice, a contrast to Emma's earlier matchmaking schemes.",
      workId: workMap.get("Emma"),
    },
    // More from One Hundred Years of Solitude
    {
      content:
        "He really had been through death, but he had returned because he could not bear the solitude.",
      analysis:
        "This quote exemplifies the novel's magical realism while exploring its central themes of solitude and the power of human connection.",
      workId: workMap.get("One Hundred Years of Solitude"),
    },
    // More from To the Lighthouse
    {
      content:
        "What is the meaning of life? That was all—a simple question; one that tended to close in on one with years.",
      analysis:
        "This passage reflects the novel's modernist preoccupation with existential questions and the search for meaning in everyday life.",
      workId: workMap.get("To the Lighthouse"),
    },
    // More from A Tale of Two Cities
    {
      content:
        "I see a beautiful city and a brilliant people rising from this abyss. I see the lives for which I lay down my life, peaceful, useful, prosperous and happy.",
      analysis:
        "Sydney Carton's final thoughts before his sacrifice, embodying the novel's themes of resurrection and redemption through sacrifice.",
      workId: workMap.get("A Tale of Two Cities"),
    },
    // More from Love in the Time of Cholera
    {
      content: "The only regret I will have in dying is if it is not for love.",
      analysis:
        "This quote encapsulates the novel's central theme of love's supreme importance and its power to give life meaning.",
      workId: workMap.get("Love in the Time of Cholera"),
    },
    // More from Mrs Dalloway
    {
      content: `[Enter suddenly and in haste a Messenger from the Mountain.]

MESSENGER:
Great Pentheus, Lord of all this Theban land,
I come from high Kithaeron, where the frore
Snow spangles gleam and cease not evermore...

PENTHEUS:
And what of import may thy coming bring?

MESSENGER:
I have seen the Wild White Women there, O King,
Whose fleet limbs darted arrow-like but now
From Thebes away, and come to tell thee how
They work strange deeds and passing marvel. Yet
I first would learn thy pleasure. Shall I set
My whole tale forth, or veil the stranger part?
Yea, Lord, I fear the swiftness of thy heart,
Thine edged wrath and more than royal soul.

PENTHEUS:
Thy tale shall nothing scathe thee. Tell the whole.
It skills not to be wroth with honesty.
Nay, if thy news of them be dark, 'tis he
Shall pay it, who bewitched and led them on.

MESSENGER:
Our herded kine were moving in the dawn
Up to the peaks, the greyest, coldest time,
When the first rays steal earthward, and the rime
Yields, when I saw three bands of them. The one
Autonoë led, one Ino, one thine own
Mother, Agâvê. There beneath the trees
Sleeping they lay, like wild things flung at ease
In the forest; one half sinking on a bed
Of deep pine greenery; one with careless head
Amid the fallen oak leaves; all most cold
In purity--not as thy tale was told
Of wine-cups and wild music and the chase
For love amid the forest's loneliness.

Then rose the Queen Agâvê suddenly
Amid her band, and gave the God's wild cry,
"Awake, ye Bacchanals! I hear the sound
Of hornèd kine. Awake ye!" Then, all round,
Alert, the warm sleep fallen from their eyes,
A marvel of swift ranks I saw them rise,
Dames young and old, and gentle maids unwed
Among them. O'er their shoulders first they shed
Their tresses, and caught up the fallen fold
Of mantles where some clasp had loosened hold,
And girt the dappled fawn-skins in with long
Quick snakes that hissed and writhed with quivering tongue.

And one a young fawn held, and one a wild
Wolf cub, and fed them with white milk, and smiled
In love, young mothers with a mother's breast
And babes at home forgotten! Then they pressed
Wreathed ivy round their brows, and oaken sprays
And flowering bryony. And one would raise
Her wand and smite the rock, and straight a jet
Of quick bright water came. Another set
Her thyrsus in the bosomed earth, and there
Was red wine that the God sent up to her,
A darkling fountain. And if any lips
Sought whiter draughts, with dipping finger-tips
They pressed the sod, and gushing from the ground
Came springs of milk. And reed-wands ivy-crowned
Ran with sweet honey, drop by drop. O King,
Hadst thou been there, as I, and seen this thing,
With prayer and most high wonder hadst thou gone
To adore this God whom now thou rail'st upon!

Howbeit, the kine-wardens and shepherds straight
Came to one place, amazed, and held debate;
And one being there who walked the streets and scanned
The ways of speech, took lead of them whose hand
Knew but the slow soil and the solemn hill,
And flattering spoke, and asked: "Is it your will,
Masters, we stay the mother of the King,
Agâvê, from her lawless worshipping,
And win us royal thanks?" And this seemed good
To all; and through the branching underwood
We hid us, cowering in the leaves. And there
Through the appointed hour they made their prayer
And worship of the Wand, with one accord
Of heart and cry--"Iacchos, Bromios, Lord,
God of God born!" And all the mountain felt,
And worshipped with them; and the wild things knelt
And ramped and gloried, and the wilderness
Was filled with moving voices and dim stress.

Soon, as it chanced, beside my thicket-close
The Queen herself passed dancing, and I rose
And sprang to seize her. But she turned her face
Upon me: "Ho, my rovers of the chase,
My wild White Hounds, we are hunted! Up, each rod
And follow, follow, for our Lord and God!"
Thereat, for fear they tear us, all we fled
Amazed; and on, with hand unweaponèd
They swept toward our herds that browsed the green
Hill grass. Great uddered kine then hadst thou seen
Bellowing in sword-like hands that cleave and tear,
A live steer riven asunder, and the air
Tossed with rent ribs or limbs of cloven tread,
And flesh upon the branches, and a red
Rain from the deep green pines. Yea, bulls of pride,
Horns swift to rage, were fronted and aside
Flung stumbling, by those multitudinous hands
Dragged pitilessly. And swifter were the bands
Of garbèd flesh and bone unbound withal
Than on thy royal eyes the lids may fall.

Then on like birds, by their own speed upborne,
They swept toward the plains of waving corn
That lie beside Asopus' banks, and bring
To Thebes the rich fruit of her harvesting.
On Hysiae and Erythrae that lie nursed
Amid Kithaeron's bowering rocks, they burst
Destroying, as a foeman's army comes.
They caught up little children from their homes,
High on their shoulders, babes unheld, that swayed
And laughed and fell not; all a wreck they made;
Yea, bronze and iron did shatter, and in play
Struck hither and thither, yet no wound had they;
Caught fire from out the hearths, yea, carried hot
Flames in their tresses and were scorchèd not!

The village folk in wrath took spear and sword,
And turned upon the Bacchae. Then, dread Lord,
The wonder was. For spear nor barbèd brand
Could scathe nor touch the damsels; but the Wand,
The soft and wreathèd wand their white hands sped,
Blasted those men and quelled them, and they fled
Dizzily. Sure some God was in these things!

And the holy women back to those strange springs
Returned, that God had sent them when the day
Dawned, on the upper heights; and washed away
The stain of battle. And those girdling snakes
Hissed out to lap the waterdrops from cheeks
And hair and breast.

Therefore I counsel thee,
O King, receive this Spirit, whoe'er he be,
To Thebes in glory. Greatness manifold
Is all about him; and the tale is told
That this is he who first to man did give
The grief-assuaging vine. Oh, let him live;
For if he die, then Love herself is slain,
And nothing joyous in the world again!`,
      analysis:
        "This passage explores Clarissa's contemplation of mortality and the meaning of existence, central themes in the novel.",
      workId: workMap.get("Mrs Dalloway"),
    },
  ];

  const createdSnippets = await prisma.snippet.createMany({
    data: snippets,
    skipDuplicates: true,
  });

  console.log(`Created ${createdSnippets.count} snippets`);

  return await prisma.snippet.findMany({
    where: {
      content: {
        in: snippets.map((s) => s.content),
      },
    },
  });
}
