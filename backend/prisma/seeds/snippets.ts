import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedSnippets(works: any[]) {
  const workMap = new Map(works.map((work) => [work.title, work.id]));

  const snippets = [
    // Pride and Prejudice snippets
    {
      content:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
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
