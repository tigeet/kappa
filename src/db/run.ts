import prisma from "./db";

async function run() {
  const data = await prisma.localUpload.findMany();
  const updatedData = data.map((data) =>
    prisma.localUpload.update({
      where: { id: data.id },
      data: {
        displayName: data.filename + data.extension,
      },
    })
  );

  await Promise.all(updatedData);
  console.log("@run finish");
}

// run();
