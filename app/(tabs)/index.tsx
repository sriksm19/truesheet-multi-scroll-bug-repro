import { useRef } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { FilterModal, FilterModalHandle } from '@/components/FilterModal';

export default function HomeScreen() {
	const sheetRef = useRef<FilterModalHandle>(null);
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView style={styles.container}>
					<View style={styles.card}>
						<Text style={styles.title}>Filter Modal</Text>
						<Text style={styles.subtitle}>
							BhBottomSheetModal + TrueSheet, with two nested
							scrollables inside (a ScrollView on the left rail
							and a FlatList on the right).
						</Text>
						<Pressable
							onPress={() => sheetRef.current?.present()}
							style={({ pressed }) => [
								styles.button,
								{ opacity: pressed ? 0.7 : 1 },
							]}
						>
							<Text style={styles.buttonText}>Open filter</Text>
						</Pressable>
					</View>
					<FilterModal ref={sheetRef} />
				</SafeAreaView>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24,
		backgroundColor: '#F8FAFC',
	},
	card: {
		alignItems: 'center',
		gap: 12,
	},
	title: {
		fontSize: 22,
		fontWeight: '700',
		color: '#0F172A',
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 14,
		color: '#475569',
		textAlign: 'center',
		maxWidth: 320,
	},
	button: {
		marginTop: 8,
		paddingHorizontal: 24,
		paddingVertical: 12,
		backgroundColor: '#4338CA',
		borderRadius: 8,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
});
