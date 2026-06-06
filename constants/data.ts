export type FilterOption = {
	id: string;
	label: string;
	isChecked: boolean;
};

export type FilterSection = {
	id: string;
	label: string;
	multi: boolean;
	searchable: boolean;
	options: FilterOption[];
};

const makeOptions = (prefix: string, count: number): FilterOption[] =>
	Array.from({ length: count }, (_, i) => ({
		id: `${prefix.toLowerCase()}-${i}`,
		label: `${prefix} ${i + 1}`,
		isChecked: false,
	}));

export const SECTIONS: FilterSection[] = [
	{
		id: 'category',
		label: 'Category',
		multi: true,
		searchable: true,
		options: makeOptions('Category', 25),
	},
	{
		id: 'platform',
		label: 'Platform',
		multi: true,
		searchable: true,
		options: makeOptions('Platform', 10),
	},
	{
		id: 'discount',
		label: 'Discount %',
		multi: false,
		searchable: false,
		options: [
			{ id: '30', label: '30% & Above', isChecked: false },
			{ id: '40', label: '40% & Above', isChecked: false },
			{ id: '50', label: '50% & Above', isChecked: false },
			{ id: '60', label: '60% & Above', isChecked: false },
			{ id: '70', label: '70% & Above', isChecked: false },
		],
	},
	{
		id: 'price',
		label: 'Price',
		multi: false,
		searchable: false,
		options: [
			{ id: 'priceH:10', label: 'Under $10', isChecked: false },
			{ id: 'price:30', label: 'Under $30', isChecked: false },
			{ id: 'price:40', label: 'Under $40', isChecked: false },
			{ id: 'price:60', label: 'Under $60', isChecked: false },
			{ id: 'price:80', label: 'Under $80', isChecked: false },
			{ id: 'price:100', label: 'Under $100', isChecked: false },
		],
	},
	{
		id: 'brand',
		label: 'Brand',
		multi: true,
		searchable: true,
		options: makeOptions('Brand', 12),
	},
	{
		id: 'material',
		label: 'Material',
		multi: true,
		searchable: true,
		options: makeOptions('Material', 6),
	},
	{
		id: 'color',
		label: 'Color',
		multi: true,
		searchable: true,
		options: makeOptions('Color', 8),
	},
	{
		id: 'size',
		label: 'Size',
		multi: true,
		searchable: true,
		options: makeOptions('Size', 5),
	},
	{
		id: 'rating',
		label: 'Rating',
		multi: false,
		searchable: false,
		options: [
			{ id: '4', label: '4 star & Above', isChecked: false },
			{ id: '3', label: '3 star & Above', isChecked: false },
			{ id: '2', label: '2 star & Above', isChecked: false },
			{ id: '1', label: '1 star & Above', isChecked: false },
		],
	},
	{
		id: 'genre',
		label: 'Genre',
		multi: true,
		searchable: true,
		options: makeOptions('Genre', 20),
	},
	{
		id: 'publisher',
		label: 'Publisher',
		multi: true,
		searchable: true,
		options: makeOptions('Publisher', 18),
	},
	{
		id: 'developer',
		label: 'Developer',
		multi: true,
		searchable: true,
		options: makeOptions('Developer', 22),
	},
	{
		id: 'language',
		label: 'Language',
		multi: true,
		searchable: true,
		options: makeOptions('Language', 15),
	},
	{
		id: 'region',
		label: 'Region',
		multi: true,
		searchable: true,
		options: makeOptions('Region', 12),
	},
	{
		id: 'condition',
		label: 'Condition',
		multi: true,
		searchable: true,
		options: makeOptions('Condition', 8),
	},
	{
		id: 'seller',
		label: 'Seller',
		multi: true,
		searchable: true,
		options: makeOptions('Seller', 14),
	},
	{
		id: 'shipping',
		label: 'Shipping',
		multi: true,
		searchable: true,
		options: makeOptions('Shipping', 10),
	},
	{
		id: 'availability',
		label: 'Availability',
		multi: true,
		searchable: true,
		options: makeOptions('Availability', 6),
	},
	{
		id: 'format',
		label: 'Format',
		multi: true,
		searchable: true,
		options: makeOptions('Format', 11),
	},
	{
		id: 'theme',
		label: 'Theme',
		multi: true,
		searchable: true,
		options: makeOptions('Theme', 16),
	},
	{
		id: 'audience',
		label: 'Audience',
		multi: true,
		searchable: true,
		options: makeOptions('Audience', 9),
	},
	{
		id: 'feature',
		label: 'Feature',
		multi: true,
		searchable: true,
		options: makeOptions('Feature', 19),
	},
	{
		id: 'collection',
		label: 'Collection',
		multi: true,
		searchable: true,
		options: makeOptions('Collection', 13),
	},
	{
		id: 'season',
		label: 'Season',
		multi: true,
		searchable: true,
		options: makeOptions('Season', 7),
	},
	{
		id: 'style',
		label: 'Style',
		multi: true,
		searchable: true,
		options: makeOptions('Style', 17),
	},
];
