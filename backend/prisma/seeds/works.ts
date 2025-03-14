import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedWorks(authors: any[]) {
  const authorMap = new Map(authors.map((author) => [author.name, author.id]));

  const works = [
    // Jane Austen
    {
      title: "Pride and Prejudice",
      introduction:
        "Pride and Prejudice is a romantic novel by Jane Austen, published in 1813. The story follows the main character Elizabeth Bennet as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of early 19th-century England.",
      pageCount: 432,
      publishYear: 1813,
      authorId: authorMap.get("Jane Austen"),
    },
    {
      title: "Sense and Sensibility",
      introduction:
        "Sense and Sensibility is a novel by Jane Austen, published in 1811. It follows the Dashwood sisters, Elinor and Marianne, as they come of age. The sisters are moved from their childhood home to a new estate, and the story follows their loves and heartbreaks.",
      pageCount: 380,
      publishYear: 1811,
      authorId: authorMap.get("Jane Austen"),
    },
    {
      title: "Emma",
      introduction:
        "Emma is a novel by Jane Austen, first published in 1815. The story follows Emma Woodhouse, a young woman who fancies herself a matchmaker and romantic schemer, but her misguided matches and romantic schemes often lead to complications.",
      pageCount: 474,
      publishYear: 1815,
      authorId: authorMap.get("Jane Austen"),
    },
    // Charles Dickens
    {
      title: "Great Expectations",
      introduction:
        "Great Expectations is the thirteenth novel by Charles Dickens. It depicts the education of an orphan nicknamed Pip. It is Dickens's second novel, after David Copperfield, to be fully narrated in the first person.",
      pageCount: 544,
      publishYear: 1861,
      authorId: authorMap.get("Charles Dickens"),
    },
    {
      title: "A Tale of Two Cities",
      introduction:
        "A Tale of Two Cities is a historical novel published in 1859. The plot centers on the years leading up to the French Revolution and culminates in the Jacobin Reign of Terror.",
      pageCount: 448,
      publishYear: 1859,
      authorId: authorMap.get("Charles Dickens"),
    },
    {
      title: "Oliver Twist",
      introduction:
        "Oliver Twist is Charles Dickens's second novel, published in 1837. The story centers on orphan Oliver Twist, born in a workhouse and sold into apprenticeship. After escaping, Oliver travels to London, where he meets the Artful Dodger, a member of a gang of juvenile pickpockets.",
      pageCount: 608,
      publishYear: 1837,
      authorId: authorMap.get("Charles Dickens"),
    },
    // Virginia Woolf
    {
      title: "Mrs Dalloway",
      introduction:
        "Mrs Dalloway is a novel by Virginia Woolf that details a day in the life of Clarissa Dalloway, a fictional high-society woman in post-First World War England. It addresses the nature of time in personal experience through multiple characters' thoughts.",
      pageCount: 194,
      publishYear: 1925,
      authorId: authorMap.get("Virginia Woolf"),
    },
    {
      title: "To the Lighthouse",
      introduction:
        "To the Lighthouse follows the Ramsay family and their visits to the Isle of Skye in Scotland between 1910 and 1920. The novel is groundbreaking for its stream of consciousness narrative technique.",
      pageCount: 209,
      publishYear: 1927,
      authorId: authorMap.get("Virginia Woolf"),
    },
    {
      title: "Orlando: A Biography",
      introduction:
        "Orlando: A Biography is a novel by Virginia Woolf, first published in 1928. The book describes the adventures of a poet who changes sex from man to woman and lives for centuries, meeting key figures of English literary history.",
      pageCount: 333,
      publishYear: 1928,
      authorId: authorMap.get("Virginia Woolf"),
    },
    // Franz Kafka
    {
      title: "The Metamorphosis",
      introduction:
        "The Metamorphosis tells the story of salesman Gregor Samsa who wakes one morning to find himself inexplicably transformed into a huge insect and subsequently struggling to adjust to this new condition.",
      pageCount: 55,
      publishYear: 1915,
      authorId: authorMap.get("Franz Kafka"),
    },
    {
      title: "The Trial",
      introduction:
        "The Trial is a novel by Franz Kafka that tells the story of Josef K., a bank clerk who is arrested and prosecuted by a remote, inaccessible authority, with the nature of his crime revealed neither to him nor to the reader.",
      pageCount: 178,
      publishYear: 1925,
      authorId: authorMap.get("Franz Kafka"),
    },
    {
      title: "The Castle",
      introduction:
        "The Castle is a novel by Franz Kafka. In it, a protagonist known only as K. arrives in a village and struggles to gain access to the mysterious authorities who govern it from a castle.",
      pageCount: 352,
      publishYear: 1926,
      authorId: authorMap.get("Franz Kafka"),
    },
    // Gabriel García Márquez
    {
      title: "One Hundred Years of Solitude",
      introduction:
        "One Hundred Years of Solitude tells the multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the town of Macondo. The magical realist style and thematic substance of the novel established it as an important representative novel of the literary Latin American Boom of the 1960s and 1970s.",
      pageCount: 417,
      publishYear: 1967,
      authorId: authorMap.get("Gabriel García Márquez"),
    },
    {
      title: "Love in the Time of Cholera",
      introduction:
        "Love in the Time of Cholera is a novel by Colombian Nobel prize winning author Gabriel García Márquez. The novel tells the story of the love affair between Florentino Ariza and Fermina Daza that spans 50 years.",
      pageCount: 348,
      publishYear: 1985,
      authorId: authorMap.get("Gabriel García Márquez"),
    },
    {
      title: "Chronicle of a Death Foretold",
      introduction:
        "Chronicle of a Death Foretold is a novella by Gabriel García Márquez. It tells, in the form of a pseudo-journalistic reconstruction, the story of the murder of Santiago Nasar by the Vicario twins.",
      pageCount: 120,
      publishYear: 1981,
      authorId: authorMap.get("Gabriel García Márquez"),
    },
  ];

  const createdWorks = await prisma.work.createMany({
    data: works,
    skipDuplicates: true,
  });

  console.log(`Created ${createdWorks.count} works`);

  // Return all created works for use in seeding snippets
  return await prisma.work.findMany({
    where: {
      title: {
        in: works.map((w) => w.title),
      },
    },
  });
}
