import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import Colors from '../../ui/Colors';
import {useMutation} from '@apollo/client';
import {USER_ROLES} from '../../utils/constants';
import {DELETE_USER_MUTATION, MODIFY_USER_ROLE_MUTATION} from './graphql';

const UserManagementModal = ({
  isModalVisible,
  onCloseModal,
  user,
  onComplete,
}) => {
  const [modifyUserRole, {data, loading}] = useMutation(
    MODIFY_USER_ROLE_MUTATION,
    {onCompleted: onComplete, onError: error => console.log('[ERROR]', error)},
  );

  const [deleteUser, {data: deleteUserData, loading: deleteUserLoading}] =
    useMutation(DELETE_USER_MUTATION, {
      onCompleted: onComplete,
      onError: error => console.log('[deleteUser Error]: ', error),
    });

  const handleChange = ({userId, role}) => {
    modifyUserRole({variables: {userId, role}});
  };

  const showUserDeleteWarning = React.useCallback(
    userId => {
      Alert.alert(
        'Warning!',
        'This action will delete every data about this user, including Bookings. Are you sure you want to continue?',
        [
          {
            text: 'Delete User',
            onPress: () => onDeleteUser(userId),
          },
          {
            text: 'Cancel',
            onPress: () => {},
          },
        ],
      );
    },
    [onDeleteUser],
  );

  const onDeleteUser = React.useCallback(
    userId => {
      deleteUser({variables: {userId}});
    },
    [deleteUser],
  );

  const isUser = user?.role === USER_ROLES.CUSTOMER;

  return (
    <Modal
      animationIn={'slideInDown'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.5}
      isVisible={isModalVisible}
      style={styles.modal}
      onBackdropPress={onCloseModal}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onCloseModal} style={styles.closeButton}>
          <Icon size={wp(5)} color={Colors.black} name="close" />
        </TouchableOpacity>

        <View style={styles.titleRow}>
          <View>
            <Text
              style={
                styles.title
              }>{`${user?.firstName} ${user?.lastName}`}</Text>

            <View style={styles.detail}>
              <Text style={styles.detailLabel}>User Role:</Text>
              <Text style={styles.detailContent}>{`${user?.role}`}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            handleChange({
              userId: user.id,
              role: isUser ? USER_ROLES.STAFF : USER_ROLES.CUSTOMER,
            })
          }>
          {loading || deleteUserLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>
              {isUser ? 'CHANGE TO STAFF' : 'CHANGE TO USER'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => showUserDeleteWarning(user.id)}>
          <Text style={styles.deleteButtonText}>Delete User Account</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default UserManagementModal;
