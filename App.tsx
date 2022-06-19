import React, { FC } from 'react'
import { StatusBar } from 'react-native'

import CoreAuthRepository from '~/data/auth/auth-repository'
import { CoreGroupRepository } from '~/data/group'
import { CoreRoomRepository } from '~/data/room'
import { FirebaseAuthDataSource } from '~/infrastructure/datasource/auth'
import { FirebaseGroupDataSource } from '~/infrastructure/datasource/group'
import FirebaseRoomDataSource from '~/infrastructure/datasource/room/firebase-room-datasource'
import Firebase from '~/infrastructure/firebase'
import { RegisterUseCase } from '~/interactor/auth'
import ChangePasswordUseCase from '~/interactor/auth/change-password-use-case'
import LoginUseCase from '~/interactor/auth/login-use-case'
import LogOutUseCase from '~/interactor/auth/logout-use-case'
import SubscribeAuthStateUseCase from '~/interactor/auth/subscribe-auth-state-use-case'
import { CreateGroupUseCase } from '~/interactor/group'
import FormatMemberWithAccessPropertiesUseCase from '~/interactor/group/format-member-with-access-properties-use-case'
import GetGroupDetailsUseCase from '~/interactor/group/get-group-details-use-case'
import GetGroupInviteLinkUseCase from '~/interactor/group/get-group-invite-link-use-case'
import GetGroupListUseCase from '~/interactor/group/get-group-list-use-case'
import JoinGroupUseCase from '~/interactor/group/join-group-use-case'
import RemoveMemberUseCase from '~/interactor/group/remove-member-use-case'
import UpdateMemberRoleUseCase from '~/interactor/group/update-member-role-use-case'
import {
  SearchRoomUseCase,
  SubscribeToRoomStateUseCase,
} from '~/interactor/room'
import CreateRoomUseCase from '~/interactor/room/create-room-use-case'
import EditTranscriptUseCase from '~/interactor/room/edit-transcript-use-case'
import EndMeetingUseCase from '~/interactor/room/end-meeting-use-case'
import GetEndMeetingPermissionUseCase from '~/interactor/room/get-end-meeting-permission-use-case'
import GetRoomListUseCase from '~/interactor/room/get-room-list-use-case'
import PublishNewContentUseCase from '~/interactor/room/publish-new-content'
import { ValidateRegisterDTOUseCase } from '~/interactor/validation'
import ValidateLoginDTOUseCase from '~/interactor/validation/validate-login-dto-use-case'
import { COLORS } from '~/presentation/colors'
import AppNavigation, { UseCases } from '~/presentation/navigation'

const firebase = new Firebase()

const firebaseAuthDataStore = new FirebaseAuthDataSource(firebase)
const firebaseGroupDataStore = new FirebaseGroupDataSource(firebase)
const firebaseRoomDataStore = new FirebaseRoomDataSource(firebase)

const authRepository = new CoreAuthRepository(firebaseAuthDataStore)
const groupRepository = new CoreGroupRepository(firebaseGroupDataStore)
const roomRepository = new CoreRoomRepository(firebaseRoomDataStore)

const registerUseCase = new RegisterUseCase(authRepository)
const validateRegisterDTOUseCase = new ValidateRegisterDTOUseCase()
const loginUseCase = new LoginUseCase(authRepository)
const logOutUseCase = new LogOutUseCase(authRepository)
const validateLoginDTOUseCase = new ValidateLoginDTOUseCase()
const subscribeAuthStateUseCase = new SubscribeAuthStateUseCase(authRepository)
const changePasswordUseCase = new ChangePasswordUseCase(authRepository)
const createGroupUseCase = new CreateGroupUseCase(groupRepository)
const getGroupListUseCase = new GetGroupListUseCase(groupRepository)
const updateMemberRoleUseCase = new UpdateMemberRoleUseCase(groupRepository)
const removeMemberUseCase = new RemoveMemberUseCase(groupRepository)
const getGroupDetailsUseCase = new GetGroupDetailsUseCase(groupRepository)
const joinGroupUseCase = new JoinGroupUseCase(groupRepository)
const getGroupInviteLinkUseCase = new GetGroupInviteLinkUseCase()
const subscribeToRoomStateUseCase = new SubscribeToRoomStateUseCase(
  roomRepository,
)
const searchRoomUseCase = new SearchRoomUseCase()
const publishNewContentUseCase = new PublishNewContentUseCase(roomRepository)
const getRoomListUseCase = new GetRoomListUseCase(roomRepository)
const createRoomUseCase = new CreateRoomUseCase(roomRepository)
const endMeetingUseCase = new EndMeetingUseCase(roomRepository)
const editTranscriptUseCase = new EditTranscriptUseCase(roomRepository)
const getEndMeetingPermissionUseCase = new GetEndMeetingPermissionUseCase()
const formatMemberWithAccessPropertiesUseCase =
  new FormatMemberWithAccessPropertiesUseCase()

const useCases: UseCases = {
  register: registerUseCase,
  validateRegisterDTO: validateRegisterDTOUseCase,
  login: loginUseCase,
  validateLoginDTO: validateLoginDTOUseCase,
  subscribeAuthStatus: subscribeAuthStateUseCase,
  createGroup: createGroupUseCase,
  getGroupList: getGroupListUseCase,
  subscribeToRoomState: subscribeToRoomStateUseCase,
  publishNewContent: publishNewContentUseCase,
  getRoomList: getRoomListUseCase,
  formatMemberWithAccessProperties: formatMemberWithAccessPropertiesUseCase,
  updateMemberRole: updateMemberRoleUseCase,
  removeMember: removeMemberUseCase,
  createRoom: createRoomUseCase,
  getGroupDetails: getGroupDetailsUseCase,
  joinGroup: joinGroupUseCase,
  getGroupInviteLink: getGroupInviteLinkUseCase,
  endMeeting: endMeetingUseCase,
  getEndMeetingPermission: getEndMeetingPermissionUseCase,
  editTranscript: editTranscriptUseCase,
  logOut: logOutUseCase,
  searchRoom: searchRoomUseCase,
  changePassword: changePasswordUseCase,
}

const App: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor={COLORS.BACKGROUND}
        barStyle="dark-content"
        translucent
        animated
      />
      <AppNavigation useCases={useCases} />
    </>
  )
}

export default App
