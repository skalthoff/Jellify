import React, { useEffect, useState } from 'react'
import { Modal, Pressable } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { YStack, Text, Button, XStack, useTheme } from 'tamagui'
import { useNavigation } from '@react-navigation/native'

export default function NoInternetModal({visible}:{visible:boolean}) {
  const navigation = useNavigation()
  const theme = useTheme()

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
  
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setVisible(false)}
      >
        <YStack
          bg="$background"
          p="$6"
          br="$6"
          width="85%"
          alignItems="center"
          onPress={(e) => e.stopPropagation()} // prevent closing on modal press
        >
          <Text fontSize="$8" fontWeight="bold">
            No Internet Connection
          </Text>
          <Text fontSize="$5" color="$gray10" textAlign="center" mt="$3">
            You're currently offline. Would you like to continue in Offline Mode?
          </Text>

          <XStack mt="$6" space="$3">
            <Button
              theme="dark"
              onPress={() => {
                navigation.navigate('Offline')
              }}
            >
              Go to Offline Mode
            </Button>
          </XStack>
        </YStack>
      </Pressable>
    </Modal>
  )
}
