import { TrueSheet } from '@lodev09/react-native-true-sheet';
import React, {
	forwardRef,
	useCallback,
	useDeferredValue,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	Dimensions,
	FlatList,
	type LayoutChangeEvent,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { FilterOption, FilterSection } from '@/constants/data';
import { SECTIONS } from '@/constants/data';

const colors = {
	background: '#FFFFFF',
	foreground: '#0F172A',
	primary: '#4338CA',
	primaryForeground: '#FFFFFF',
	onSurface: '#1E293B',
	slate50: '#F8FAFC',
	slate100: '#F1F5F9',
	slate200: '#E2E8F0',
	slate300: '#CBD5E1',
	slate500: '#64748B',
	slate800: '#1E293B',
};

const spacing = {
	'2': 4,
	'4': 8,
	'6': 12,
	'8': 16,
	'10': 20,
	'16': 32,
	'25': 50,
};

const fontSize = {
	xs: 12,
	sm: 14,
	base: 16,
	lg: 18,
};

const screenHeight = Dimensions.get('window').height;

function useLayout() {
	const [{ height }, setLayoutState] = useState({ height: 0 });
	const onLayout = useCallback((e: LayoutChangeEvent) => {
		setLayoutState({ height: e.nativeEvent.layout.height });
	}, []);
	return [{ height }, onLayout] as const;
}

type CtaConfig = {
	label: string;
	onPress: () => void;
};

type BhBottomSheetModalLiteProps = {
	name: string;
	detents?: number[];
	scrollable?: boolean;
	maxHeight?: number;
	title: string;
	primaryCta: CtaConfig;
	secondaryCta?: CtaConfig;
	onWillPresent?: () => void;
	onDidDismiss?: () => void;
	children:
		| React.ReactNode
		| ((
				maxContentHeight: number,
				headerHeight: number,
				footerHeight: number
		  ) => React.ReactNode);
};

const BhBottomSheetModalLite = forwardRef<
	TrueSheet,
	BhBottomSheetModalLiteProps
>(
	(
		{
			name,
			detents = [1],
			scrollable,
			maxHeight,
			title,
			primaryCta,
			secondaryCta,
			onWillPresent,
			onDidDismiss,
			children,
		},
		ref
	) => {
		const { bottom, top } = useSafeAreaInsets();
		const [headerLayout, setHeaderLayout] = useLayout();
		const [footerLayout, setFooterLayout] = useLayout();
		const availableScreenHeight = screenHeight - top - spacing[25];
		const resolvedMaxContentHeight =
			typeof maxHeight === 'number' ? maxHeight : availableScreenHeight;

		return (
			<TrueSheet
				ref={ref}
				name={name}
				detents={detents}
				maxContentHeight={resolvedMaxContentHeight}
				backgroundColor={colors.background}
				dimmed
				grabber
				grabberOptions={{
					color: colors.slate800,
					topMargin: spacing[4],
					height: 4,
					width: 48,
					adaptive: false,
				}}
				scrollable={scrollable}
				header={
					<View
						onLayout={setHeaderLayout}
						style={{
							paddingHorizontal: spacing[16],
							paddingTop: spacing[16],
							paddingBottom: spacing[6],
						}}
					>
						<Text
							style={{
								fontSize: fontSize.lg,
								fontWeight: '600',
								color: colors.foreground,
							}}
						>
							{title}
						</Text>
					</View>
				}
				footer={
					<GestureHandlerRootView
						onLayout={setFooterLayout}
						style={{
							flexDirection: 'row',
							gap: spacing[8],
							backgroundColor: colors.background,

							paddingHorizontal: spacing[16],
							paddingTop: spacing[6],
							paddingBottom: Math.max(bottom, spacing[6]),
						}}
					>
						{secondaryCta ? (
							<Pressable
								onPress={secondaryCta.onPress}
								style={({ pressed }) => [
									styles.footerButton,
									{
										backgroundColor: colors.slate100,
										opacity: pressed ? 0.7 : 1,
									},
								]}
							>
								<Text
									style={{
										fontSize: fontSize.base,
										fontWeight: '600',
										color: colors.foreground,
									}}
								>
									{secondaryCta.label}
								</Text>
							</Pressable>
						) : null}
						<Pressable
							onPress={primaryCta.onPress}
							style={({ pressed }) => [
								styles.footerButton,
								{
									backgroundColor: colors.primary,
									opacity: pressed ? 0.7 : 1,
								},
							]}
						>
							<Text
								style={{
									fontSize: fontSize.base,
									fontWeight: '600',
									color: colors.primaryForeground,
								}}
							>
								{primaryCta.label}
							</Text>
						</Pressable>
					</GestureHandlerRootView>
				}
				onWillPresent={onWillPresent}
				onDidDismiss={onDidDismiss}
			>
				{typeof children === 'function'
					? children(
							resolvedMaxContentHeight,
							headerLayout.height,
							footerLayout.height - bottom
						)
					: children}
			</TrueSheet>
		);
	}
);

BhBottomSheetModalLite.displayName = 'BhBottomSheetModalLite';

const styles = StyleSheet.create({
	footerButton: {
		flex: 1,
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export type FilterModalHandle = {
	present: () => void;
	dismiss: () => void;
};

type CheckboxRowProps = {
	item: FilterOption;
	onToggle: () => void;
	paddingVertical: number;
	paddingHorizontal: number;
};

const CheckboxRow = ({
	item,
	onToggle,
	paddingVertical,
	paddingHorizontal,
}: CheckboxRowProps) => (
	<Pressable
		onPress={onToggle}
		style={({ pressed }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical,
			paddingHorizontal,
			gap: spacing[10],
			opacity: pressed ? 0.6 : 1,
		})}
	>
		<View
			style={{
				width: 18,
				height: 18,
				borderRadius: 4,
				borderWidth: 1.5,
				borderColor: item.isChecked ? colors.primary : colors.slate300,
				backgroundColor: item.isChecked
					? colors.primary
					: 'transparent',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{item.isChecked ? (
				<Text
					style={{
						color: colors.primaryForeground,
						fontSize: 12,
						fontWeight: '700',
					}}
				>
					✓
				</Text>
			) : null}
		</View>
		<Text
			numberOfLines={1}
			style={{
				fontSize: fontSize.base,
				color: colors.foreground,
				flexShrink: 1,
			}}
		>
			{item.label}
		</Text>
	</Pressable>
);

const SKELETON_WIDTHS: `${number}%`[] = [
	'60%',
	'45%',
	'70%',
	'50%',
	'55%',
	'65%',
	'40%',
	'68%',
];

const FilterListSkeleton = ({ itemHeight }: { itemHeight: number }) =>
	SKELETON_WIDTHS.map((w, i) => (
		<View
			key={i}
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				paddingHorizontal: spacing[16],
				gap: spacing[8],
				height: itemHeight,
			}}
		>
			<View
				style={{
					width: 16,
					height: 16,
					borderRadius: 4,
					backgroundColor: colors.slate200,
				}}
			/>
			<View
				style={{
					width: w,
					height: 12,
					borderRadius: 4,
					backgroundColor: colors.slate200,
				}}
			/>
		</View>
	));

type SearchEmptyStateProps = {
	query: string;
	onClear: () => void;
};

const SearchEmptyState = ({ query, onClear }: SearchEmptyStateProps) => (
	<View
		style={{
			flex: 0.8,
			alignItems: 'center',
			justifyContent: 'center',
			paddingHorizontal: spacing[16],
			gap: spacing[8],
		}}
	>
		<Text
			style={{
				fontSize: fontSize.sm,
				color: colors.onSurface,
				textAlign: 'center',
				fontWeight: '600',
			}}
		>
			{`No results for "${query}"`}
		</Text>
		<Text
			style={{
				fontSize: fontSize.xs,
				color: colors.slate500,
				textAlign: 'center',
			}}
		>
			Try a different search term
		</Text>
		<Pressable
			onPress={onClear}
			style={({ pressed }) => ({
				paddingHorizontal: spacing[16],
				paddingVertical: spacing[8],
				borderRadius: 8,
				borderWidth: 1,
				borderColor: colors.slate300,
				marginTop: spacing[4],
				opacity: pressed ? 0.7 : 1,
			})}
		>
			<Text
				style={{
					fontSize: fontSize.sm,
					color: colors.foreground,
					fontWeight: '600',
				}}
			>
				Clear search
			</Text>
		</Pressable>
	</View>
);

export const FilterModal = forwardRef<FilterModalHandle>((_, ref) => {
	const sheetRef = useRef<TrueSheet>(null);

	const [filterData, setFilterData] = useState<FilterSection[]>(SECTIONS);
	const [selectedSection, setSelectedSection] = useState<string | undefined>(
		SECTIONS[0]?.id
	);
	const [query, setQuery] = useState('');
	const deferredQuery = useDeferredValue(query);
	const sectionQuery = useRef<Record<string, string>>({});

	const [isVisible, setIsVisible] = useState(false);
	const [isReady, setReadyState] = useState(false);

	useImperativeHandle(
		ref,
		() => ({
			present: () => {
				sheetRef.current?.present();
			},
			dismiss: () => {
				sheetRef.current?.dismiss();
			},
		}),
		[]
	);

	const handleSectionChange = useCallback(
		(next: string) => {
			if (selectedSection) {
				sectionQuery.current[selectedSection] = query;
			}
			if (selectedSection !== next) {
				setReadyState(false);
				setSelectedSection(next);
				setQuery(sectionQuery.current[next] || '');
			}
		},
		[selectedSection, query]
	);

	const activeSection = useMemo(
		() => filterData.find((s) => s.id === selectedSection),
		[filterData, selectedSection]
	);

	const finalList = useMemo(() => {
		const opts = activeSection?.options ?? [];
		const lower = deferredQuery.toLowerCase().trim();
		return lower
			? opts.filter((o) => o.label.toLowerCase().includes(lower))
			: opts;
	}, [activeSection, deferredQuery]);

	useEffect(() => {
		setReadyState(true);
	}, [activeSection]);

	useEffect(() => {
		setSelectedSection(SECTIONS[0]?.id);
		if (isVisible) {
			setFilterData(SECTIONS);
		}
		setQuery('');
		sectionQuery.current = {};
	}, [isVisible]);

	const itemHeight =
		spacing[8] * 2 + Math.max(spacing[8], fontSize.xs * 1.33);

	const toggle = useCallback(
		(categoryId: string, optionId: string, multi: boolean) => {
			setFilterData((prev) =>
				prev.map((category) => {
					if (category.id !== categoryId) {
						return category;
					}
					if (!multi) {
						return {
							...category,
							options: category.options.map((o) => ({
								...o,
								isChecked:
									o.id === optionId ? !o.isChecked : false,
							})),
						};
					}
					return {
						...category,
						options: category.options.map((o) =>
							o.id === optionId
								? { ...o, isChecked: !o.isChecked }
								: o
						),
					};
				})
			);
		},
		[]
	);

	const handleApply = useCallback(() => {
		const selected: Record<string, unknown> = {};
		filterData.forEach((cat) => {
			if (!cat.multi) {
				const sel = cat.options.find((o) => o.isChecked);
				if (sel) {
					selected[cat.id] = sel.id;
				}
			} else {
				const sel = cat.options
					.filter((o) => o.isChecked)
					.map((o) => o.id);
				if (sel.length > 0) {
					selected[cat.id] = sel;
				}
			}
		});
		console.log('[FilterModal] apply:', selected);
		sheetRef.current?.dismiss();
	}, [filterData]);

	const handleReset = useCallback(() => {
		setFilterData(
			SECTIONS.map((el) => ({
				...el,
				options: el.options.map((o) => ({ ...o, isChecked: false })),
			}))
		);
	}, []);

	const [searchBarLayout, setSearchBarLayout] = useLayout();

	const searchBarHeight = searchBarLayout.height;
	if (!activeSection) {
		return null;
	}

	const scrollable = true;

	return (
		<BhBottomSheetModalLite
			ref={sheetRef}
			name="filter-modal-bug-repro"
			detents={[1]}
			scrollable={scrollable}
			title="Filters"
			primaryCta={{ label: 'Apply', onPress: handleApply }}
			secondaryCta={{ label: 'Reset', onPress: handleReset }}
			onWillPresent={() => setIsVisible(true)}
			onDidDismiss={() => setIsVisible(false)}
		>
			{(maxContentHeight, headerHeight, footerHeight) => (
				<View
					style={{
						height: maxContentHeight - headerHeight - footerHeight,
						flexShrink: 1,
						flexGrow: 0,
					}}
				>
					<View
						style={{
							paddingHorizontal: spacing[8],
							paddingBottom: spacing[4],
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								backgroundColor: colors.slate100,
								borderRadius: 8,
								paddingHorizontal: spacing[10],
								paddingVertical: spacing[8],
								gap: spacing[8],
								opacity: activeSection.searchable ? 1 : 0.5,
							}}
							onLayout={setSearchBarLayout}
						>
							<Text
								style={{
									fontSize: 16,
									color: activeSection.searchable
										? colors.primary
										: colors.slate300,
								}}
							>
								{'\u{1F50D}'}
							</Text>
							<TextInput
								value={query}
								editable={activeSection.searchable}
								placeholder={`Scrollable ${scrollable}`}
								placeholderTextColor={colors.slate500}
								onChangeText={setQuery}
								style={{
									flex: 1,
									fontSize: fontSize.base,
									color: colors.foreground,
									padding: 0,
								}}
							/>
							{query.length > 0 ? (
								<Pressable
									onPress={() => setQuery('')}
									hitSlop={8}
								>
									<Text
										style={{
											color: colors.slate500,
											fontSize: 16,
										}}
									>
										{'\u2715'}
									</Text>
								</Pressable>
							) : null}
						</View>
					</View>

					<View
						style={{
							flex: 1,
							flexDirection: 'row',
						}}
					>
						<ScrollView
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{
								flexGrow: 1,
							}}
						>
							{filterData.map((section) => {
								const isActive = section.id === selectedSection;
								return (
									<Pressable
										key={section.id}
										onPress={() =>
											handleSectionChange(section.id)
										}
										style={{
											height: 40,
											justifyContent: 'center',
											paddingHorizontal: spacing[8],
											backgroundColor: isActive
												? colors.background
												: colors.slate100,
											borderLeftWidth: isActive ? 3 : 0,
											borderLeftColor: colors.primary,
										}}
									>
										<Text
											style={{
												fontSize: fontSize.xs,
												fontWeight: isActive
													? '600'
													: '500',
												color: isActive
													? colors.primary
													: colors.onSurface,
											}}
										>
											{section.label}
										</Text>
									</Pressable>
								);
							})}
						</ScrollView>

						<FlatList
							data={finalList}
							keyExtractor={(item) => String(item.id)}
							contentContainerStyle={{
								flexGrow: 1,
							}}
							renderItem={({ item }) => (
								<CheckboxRow
									item={item}
									onToggle={() =>
										toggle(
											activeSection.id,
											String(item.id),
											activeSection.multi
										)
									}
									paddingVertical={spacing[8]}
									paddingHorizontal={spacing[8]}
								/>
							)}
							ListEmptyComponent={
								<SearchEmptyState
									query={deferredQuery}
									onClear={() => setQuery('')}
								/>
							}
						/>
					</View>
				</View>
			)}
		</BhBottomSheetModalLite>
	);
});

FilterModal.displayName = 'FilterModal';
