import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';

interface Props {
  isOpen: boolean;
  isEventDone: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDone?: () => void;
}

const BottomMenu = ({
  isOpen,
  isEventDone,
  onClose,
  onEdit,
  onDelete,
  onDone,
}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        transparent
        animationType="fade"
        visible={isOpen}
        onRequestClose={onClose}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.menuContainer}>
          {!isEventDone && (
            <TouchableOpacity style={styles.menuItem} onPress={onDone}>
              <Text style={styles.menuText}>Done</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
            <Text style={styles.menuText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
            <Text style={[styles.menuText, styles.deleteText]}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuItem, styles.cancelButton]}
            onPress={onClose}>
            <Text style={styles.menuText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    backgroundColor: '#252525',
    // padding: 15,
    paddingTop: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  menuItem: {
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
  },
  deleteText: {
    color: '#FF3B30',
  },
  cancelButton: {
    borderBottomWidth: 0,
    // marginTop: 10,
  },
});

export default BottomMenu;
