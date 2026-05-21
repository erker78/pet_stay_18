import { PrismaClient } from "@prisma/client";
import { hotels } from "../lib/data";

const prisma = new PrismaClient();

const serviceSlugs: Record<string, string> = {
  寵物住宿: "boarding",
  寵物安親: "daycare",
  寵物美容: "grooming",
  "24小時監視器": "camera-24h",
  接送服務: "pickup"
};

const petTypeSlugs: Record<string, string> = {
  狗: "dog",
  貓: "cat"
};

async function main() {
  for (const city of [
    { name: "高雄", slug: "kaohsiung" },
    { name: "台南", slug: "tainan" },
    { name: "屏東", slug: "pingtung" }
  ]) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: { name: city.name },
      create: city
    });
  }

  for (const [name, slug] of Object.entries(serviceSlugs)) {
    await prisma.service.upsert({
      where: { slug },
      update: { name },
      create: { name, slug }
    });
  }

  for (const [name, slug] of Object.entries(petTypeSlugs)) {
    await prisma.petType.upsert({
      where: { slug },
      update: { name },
      create: { name, slug }
    });
  }

  for (const hotel of hotels) {
    const city = await prisma.city.findUniqueOrThrow({ where: { slug: hotel.city.slug } });

    await prisma.hotel.upsert({
      where: { slug: hotel.slug },
      update: {
        name: hotel.name,
        cityId: city.id,
        district: hotel.district,
        address: hotel.address,
        phone: hotel.phone,
        lineId: hotel.lineId,
        websiteUrl: hotel.websiteUrl,
        googleMapUrl: hotel.googleMapUrl,
        description: hotel.description,
        priceMin: hotel.priceMin,
        priceMax: hotel.priceMax,
        rating: hotel.rating,
        isFeatured: hotel.isFeatured,
        isPublished: true,
        hours: hotel.hours,
        sizeLimits: hotel.sizeLimits,
        tags: hotel.tags,
        services: {
          set: [],
          connect: hotel.services.map((service) => ({ slug: serviceSlugs[service] }))
        },
        petTypes: {
          set: [],
          connect: hotel.petTypes.map((petType) => ({ slug: petTypeSlugs[petType] }))
        },
        images: {
          deleteMany: {},
          create: hotel.images.map((image, index) => ({
            url: image.url,
            alt: image.alt,
            sortOrder: index
          }))
        }
      },
      create: {
        name: hotel.name,
        slug: hotel.slug,
        cityId: city.id,
        district: hotel.district,
        address: hotel.address,
        phone: hotel.phone,
        lineId: hotel.lineId,
        websiteUrl: hotel.websiteUrl,
        googleMapUrl: hotel.googleMapUrl,
        description: hotel.description,
        priceMin: hotel.priceMin,
        priceMax: hotel.priceMax,
        rating: hotel.rating,
        isFeatured: hotel.isFeatured,
        isPublished: true,
        hours: hotel.hours,
        sizeLimits: hotel.sizeLimits,
        tags: hotel.tags,
        services: {
          connect: hotel.services.map((service) => ({ slug: serviceSlugs[service] }))
        },
        petTypes: {
          connect: hotel.petTypes.map((petType) => ({ slug: petTypeSlugs[petType] }))
        },
        images: {
          create: hotel.images.map((image, index) => ({
            url: image.url,
            alt: image.alt,
            sortOrder: index
          }))
        }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
