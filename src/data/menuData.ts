export interface MenuItem {
  id: string;
  name: string;
  price: string;
  rating: string;
  category: string;
  description: string;
  image: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Smoked Grilled Ribs",
    price: "₱450",
    rating: "4.9",
    category: "Signature Grill",
    description: "Tender pork ribs slow-cooked and smoked to perfection with our secret BBQ glaze.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
  },
  {
    id: "2",
    name: "Chargrilled Beef Steak",
    price: "₱580",
    rating: "4.8",
    category: "Premium Steaks",
    description: "Juicy ribeye steak seared over high heat, served with garlic butter and grilled veggies.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
  },
  {
    id: "3",
    name: "Grilled Chicken Inasal",
    price: "₱220",
    rating: "4.7",
    category: "Local Specialties",
    description: "Marinated chicken thigh grilled over charcoal, brushed with annatto oil.",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&q=80",
  },
  {
    id: "4",
    name: "BBQ Grilled Pork Liempo",
    price: "₱260",
    rating: "4.8",
    category: "Local Specialties",
    description: "Thick-cut pork belly marinated in sweet soy sauce and grilled until crispy-edged.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80",
  },
  {
    id: "5",
    name: "Grilled Salmon Fillet",
    price: "₱490",
    rating: "4.9",
    category: "Seafood Grill",
    description: "Fresh Atlantic salmon grilled with lemon butter sauce and herbs.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
  },
];