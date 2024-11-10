import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ConfirmLogoutModal from './ConfirmLogoutModal';

const Header = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignOut = () => {
    setModalVisible(false);
    signOut();
  };

  return (
    <View className="flex-row justify-between items-center px-5 mt-5">
      <View className="flex-row items-center gap-3">
        <Image
          source={{ uri: user?.imageUrl }}
          className="h-[45] w-[45] rounded-full"
        />
        <Text className="text-base font-semibold">
          Chào, <Text className="font-bold text-xl">{user?.firstName}!</Text>
        </Text>
      </View>
      <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.push('/createTrip')}>
          <Ionicons name="add-circle-sharp" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="logout" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <ConfirmLogoutModal
        visible={modalVisible}
        onConfirm={handleSignOut}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
};

export default Header;