import 'dotenv/config';
import bcrypt from 'bcrypt';
import { prisma } from '../src/config/prisma';
import { slugify } from '../src/utils/slugify';

const BCRYPT_ROUNDS = 12;

const img = (seed: string, n = 1) =>
  Array.from({ length: n }, (_, i) => `https://picsum.photos/seed/lumi-${seed}-${i}/900/1125`);

async function seedUsers() {
  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? 'admin@lumi.dev';
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? 'LumiAdmin123!';

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, BCRYPT_ROUNDS),
      fullName: 'LUMI Admin',
      role: 'ADMIN',
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@lumi.dev' },
    update: {},
    create: {
      email: 'customer@lumi.dev',
      password: await bcrypt.hash('Customer123!', BCRYPT_ROUNDS),
      fullName: 'Ava Customer',
      role: 'CUSTOMER',
    },
  });

  console.log(`Seeded admin (${admin.email}) and customer (${customer.email})`);
  return { admin, customer };
}

async function seedCategories() {
  const categories = [
    { name: 'Outerwear', imageUrl: img('cat-outerwear')[0] },
    { name: 'Dresses', imageUrl: img('cat-dresses')[0] },
    { name: 'Knitwear', imageUrl: img('cat-knitwear')[0] },
    { name: 'Tailoring', imageUrl: img('cat-tailoring')[0] },
    { name: 'Denim', imageUrl: img('cat-denim')[0] },
    { name: 'Footwear', imageUrl: img('cat-footwear')[0] },
  ];

  const created = [];
  for (const category of categories) {
    const slug = slugify(category.name);
    const record = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name: category.name, slug, imageUrl: category.imageUrl },
    });
    created.push(record);
  }

  console.log(`Seeded ${created.length} categories`);
  return created;
}

async function seedProducts(categories: Awaited<ReturnType<typeof seedCategories>>) {
  const byName = (name: string) => categories.find((c) => c.name === name)!.id;

  const products = [
    {
      name: 'Tailored Wool Coat',
      description:
        'A structured wool-blend coat with clean lines and a fluid drape, designed to layer effortlessly over tailoring or knitwear.',
      price: 289,
      images: img('tailored-coat', 3),
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Camel'],
      categoryId: byName('Outerwear'),
      budgetTier: 'PREMIUM' as const,
      suitableBodyTypes: ['RECTANGLE', 'HOURGLASS'] as const,
      suitableSkinTones: ['FAIR', 'LIGHT', 'MEDIUM'] as const,
      styleTags: ['CLASSIC', 'MINIMALIST'] as const,
      occasionTags: ['WORK', 'CASUAL'] as const,
      isFeatured: true,
      isNewArrival: true,
    },
    {
      name: 'Silk Slip Dress',
      description:
        'Cut on the bias from fluid silk, this slip dress skims the body for an understated, elevated silhouette.',
      price: 195,
      discountPrice: 149,
      images: img('silk-slip-dress', 3),
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Ivory', 'Black'],
      categoryId: byName('Dresses'),
      budgetTier: 'MID_RANGE' as const,
      suitableBodyTypes: ['HOURGLASS', 'PEAR'] as const,
      suitableSkinTones: ['OLIVE', 'TAN', 'DEEP'] as const,
      styleTags: ['CLASSIC'] as const,
      occasionTags: ['PARTY', 'DATE_NIGHT'] as const,
      isFeatured: true,
      isBestSeller: true,
    },
    {
      name: 'Merino Crewneck Knit',
      description: 'Fine-gauge merino wool knitted in a relaxed fit, finished with a ribbed crewneck and cuffs.',
      price: 129,
      images: img('merino-knit', 2),
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Ecru', 'Charcoal', 'Navy'],
      categoryId: byName('Knitwear'),
      budgetTier: 'MID_RANGE' as const,
      suitableBodyTypes: ['RECTANGLE', 'ATHLETIC'] as const,
      suitableSkinTones: ['FAIR', 'LIGHT'] as const,
      styleTags: ['MINIMALIST', 'CASUAL'] as const,
      occasionTags: ['CASUAL', 'WORK'] as const,
      isNewArrival: true,
    },
    {
      name: 'Wide-Leg Tailored Trouser',
      description: 'High-waisted trousers with a fluid wide leg and a single pleat, tailored from a heavyweight suiting fabric.',
      price: 165,
      images: img('wide-leg-trouser', 2),
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Black', 'Stone'],
      categoryId: byName('Tailoring'),
      budgetTier: 'MID_RANGE' as const,
      suitableBodyTypes: ['PEAR', 'INVERTED_TRIANGLE'] as const,
      suitableSkinTones: ['MEDIUM', 'OLIVE'] as const,
      styleTags: ['CLASSIC', 'FORMAL'] as const,
      occasionTags: ['WORK', 'FORMAL'] as const,
      isBestSeller: true,
    },
    {
      name: 'Straight Rigid Denim',
      description: 'A straight-leg jean cut from rigid organic cotton denim that softens and molds to the body over time.',
      price: 110,
      images: img('straight-jean', 2),
      sizes: ['24', '25', '26', '27', '28', '29', '30'],
      colors: ['Indigo', 'Washed Black'],
      categoryId: byName('Denim'),
      budgetTier: 'BUDGET' as const,
      suitableBodyTypes: ['ATHLETIC', 'RECTANGLE'] as const,
      suitableSkinTones: ['TAN', 'DEEP'] as const,
      styleTags: ['CASUAL', 'STREETWEAR'] as const,
      occasionTags: ['CASUAL'] as const,
      isNewArrival: true,
    },
    {
      name: 'Leather Penny Loafer',
      description: 'Handcrafted leather loafers with a moc-stitched apron toe and a leather sole.',
      price: 245,
      images: img('leather-loafer', 2),
      sizes: ['36', '37', '38', '39', '40', '41'],
      colors: ['Black', 'Tan'],
      categoryId: byName('Footwear'),
      budgetTier: 'PREMIUM' as const,
      suitableBodyTypes: ['HOURGLASS', 'RECTANGLE', 'ATHLETIC'] as const,
      suitableSkinTones: ['FAIR', 'MEDIUM', 'OLIVE'] as const,
      styleTags: ['CLASSIC'] as const,
      occasionTags: ['WORK', 'CASUAL'] as const,
      isBestSeller: true,
      isFeatured: true,
    },
  ];

  const created = [];
  for (const product of products) {
    const slug = slugify(product.name);
    const record = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        ...product,
        slug,
        stock: 40,
        suitableBodyTypes: [...product.suitableBodyTypes],
        suitableSkinTones: [...product.suitableSkinTones],
        styleTags: [...product.styleTags],
        occasionTags: [...product.occasionTags],
      },
    });
    created.push(record);
  }

  console.log(`Seeded ${created.length} products`);
  return created;
}

async function seedOrders(
  customer: Awaited<ReturnType<typeof seedUsers>>['customer'],
  products: Awaited<ReturnType<typeof seedProducts>>
) {
  const existing = await prisma.order.count();
  if (existing > 0) {
    console.log('Orders already seeded, skipping');
    return;
  }

  const [coat, dress, loafer] = products;

  const orderDefs = [
    {
      orderNumber: 'LUMI-000001',
      status: 'DELIVERED' as const,
      items: [
        { product: coat, size: 'M', color: 'Black', quantity: 1 },
        { product: loafer, size: '39', color: 'Tan', quantity: 1 },
      ],
    },
    {
      orderNumber: 'LUMI-000002',
      status: 'PROCESSING' as const,
      items: [{ product: dress, size: 'S', color: 'Ivory', quantity: 1 }],
    },
    {
      orderNumber: 'LUMI-000003',
      status: 'PENDING' as const,
      items: [{ product: coat, size: 'L', color: 'Camel', quantity: 1 }],
    },
  ];

  for (const def of orderDefs) {
    const subtotal = def.items.reduce(
      (sum, item) => sum + Number(item.product.discountPrice ?? item.product.price) * item.quantity,
      0
    );
    const shippingFee = 12;

    await prisma.order.create({
      data: {
        orderNumber: def.orderNumber,
        userId: customer.id,
        status: def.status,
        subtotal,
        shippingFee,
        total: subtotal + shippingFee,
        shippingName: customer.fullName,
        shippingPhone: '+1 555 010 2200',
        shippingAddressLine: '221B Baker Street',
        shippingCity: 'London',
        shippingPostalCode: 'NW1 6XE',
        shippingCountry: 'United Kingdom',
        items: {
          create: def.items.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            productImage: item.product.images[0],
            unitPrice: item.product.discountPrice ?? item.product.price,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
          })),
        },
      },
    });
  }

  console.log(`Seeded ${orderDefs.length} orders`);
}

async function main() {
  const { customer } = await seedUsers();
  const categories = await seedCategories();
  const products = await seedProducts(categories);
  await seedOrders(customer, products);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
