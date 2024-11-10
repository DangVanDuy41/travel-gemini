import { View, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Trip } from '@/types/Trip';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebouce';

interface Props {
  trips: Trip[]
  handleFilter: (trip: Trip[]) => void
}

const InputFilter = ({ trips, handleFilter }: Props) => {

  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce(searchText, 500);

  const removeVietnameseTones = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };
  useEffect(() => {
    const filteredTrips = trips.filter(trip =>
      removeVietnameseTones(trip.travelPlan.location.toLowerCase()).includes(
        removeVietnameseTones(debouncedSearchText.toLowerCase())
      )
    );
    handleFilter(filteredTrips);
  }, [debouncedSearchText]);

  return (
    <View className="px-5 mt-12 mb-7">
      <View className="flex-row items-center border rounded-2xl p-3">
        <AntDesign name="search1" size={24} color="black" />
        <TextInput
          placeholder="Tìm kiếm chuyến đi"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default InputFilter;