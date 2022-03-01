import io from 'socket.io-client';
import Logger from './utils/logger';
import { SOCKET_IO_SERVER } from './config';

const EVENT_JOIN_ROOM = 'join-room';
const EVENT_LEAVE_ROOM = 'leave-room';
const EVENT_LIST_LIVE_STREAM = 'list-live-stream';
const EVENT_BEGIN_LIVE_STREAM = 'begin-live-stream';
const EVENT_FINISH_LIVE_STREAM = 'finish-live-stream';
const EVENT_SEND_HEART = 'send-heart';
const EVENT_SEND_MESSAGE = 'send-message';
const EVENT_PREPARE_LIVE_STREAM = 'prepare-live-stream';
const EVENT_SEND_REPLAY = 'replay';
const EVENT_CANCEL_LIVE_STREAM = 'cancel-live-stream';
const EVENT_UPDATE_VIEWER_COUNT = 'update-viewer-count';
const EVENT_GET_STREAM_CARDS = 'get-stream-cards';
const EVENT_JOIN_NOTIFICATION = 'join-notification';

class SocketManager {
  socket = null;

  constructor() {
    if (SocketManager.instance) {
      return SocketManager.instance;
    }
    SocketManager.instance = this;
    this.socket = io.connect(SOCKET_IO_SERVER);
    this.setupListenDefaultEvents();
    return this;
  }

  setupListenDefaultEvents() {
    this.socket.on('connect', () => {
      Logger.instance.log('connect');
    });
    this.socket.on('disconnect', () => {
      Logger.instance.log('disconnect');
    });
  }

  //
  // ──────────────────────────────────────────────────────────────── I ──────────
  //   :::::: L I S T E N   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  listenPrepareLiveStream(callback = () => null) {
    this.socket.on(EVENT_PREPARE_LIVE_STREAM, () => {
      Logger.instance.log(`${EVENT_PREPARE_LIVE_STREAM} :`);
      return callback();
    });
  }

  listenBeginLiveStream(callback = () => null) {
    this.socket.on(EVENT_BEGIN_LIVE_STREAM, (data) => {
      Logger.instance.log(`${EVENT_BEGIN_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }

  listenFinishLiveStream(callback = () => null) {
    this.socket.on(EVENT_FINISH_LIVE_STREAM, (data) => {
      Logger.instance.log(`${EVENT_FINISH_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }

  listenListLiveStream(callback = () => null) {
    this.socket.on(EVENT_LIST_LIVE_STREAM, (data) => {
      Logger.instance.log(`${EVENT_LIST_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }

  listenSendHeart(callback = () => null) {
    this.socket.on(EVENT_SEND_HEART, () => {
      Logger.instance.log(`${EVENT_SEND_HEART} :`);
      return callback();
    });
  }

  listenSendMessage(callback = () => null) {
    this.socket.on(EVENT_SEND_MESSAGE, (data) => {
      Logger.instance.log(`${EVENT_SEND_MESSAGE} :`);
      return callback(data);
    });
  }

  listenReplay(callback = () => null) {
    this.socket.on(EVENT_SEND_REPLAY, (data) => {
      Logger.instance.log(`${EVENT_SEND_REPLAY} :`);
      return callback(data);
    });
  }

  listenCancelLiveStream(callback = () => null) {
    this.socket.on(EVENT_CANCEL_LIVE_STREAM, (data) => {
      Logger.instance.log(`${EVENT_CANCEL_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }

  listenUpdateViewerCount(callback = () => null) {
    this.socket.on(EVENT_UPDATE_VIEWER_COUNT, (data) => {
      Logger.instance.log(`${EVENT_UPDATE_VIEWER_COUNT} :`, data);
      return callback(data);
    });
  }

  listenGetStreamCards(callback = () => null) {
    this.socket.on(EVENT_GET_STREAM_CARDS, (data) => {
      Logger.instance.log(`${EVENT_GET_STREAM_CARDS} :`, data);
      return callback(data);
    });
  }

  listenJoinNotification(callback = () => null) {
    this.socket.on(EVENT_JOIN_NOTIFICATION, (data) => {
      Logger.instance.log(`${EVENT_JOIN_NOTIFICATION} :`, data);
      return callback(data);
    });
  }

  //
  // ──────────────────────────────────────────────────────────── I ──────────
  //   :::::: E M I T   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  emitPrepareLiveStream({ userName, roomName, productLink, productPrice }) {
    this.socket.emit(EVENT_PREPARE_LIVE_STREAM, { userName, roomName, productLink, productPrice });
  }

  emitJoinRoom({ userName, roomName }) {
    this.socket.emit(EVENT_JOIN_ROOM, { userName, roomName });
  }

  emitLeaveRoom({ userName, roomName }) {
    this.socket.emit(EVENT_LEAVE_ROOM, { userName, roomName });
  }

  emitBeginLiveStream({ userName, roomName }) {
    this.socket.emit(EVENT_BEGIN_LIVE_STREAM, { userName, roomName });
  }

  emitFinishLiveStream({ userName, roomName }) {
    this.socket.emit(EVENT_FINISH_LIVE_STREAM, { userName, roomName });
  }

  emitListLiveStream() {
    this.socket.emit(EVENT_LIST_LIVE_STREAM);
  }

  emitSendHeart({ roomName }) {
    this.socket.emit(EVENT_SEND_HEART, { roomName });
  }

  emitSendMessage({ roomName, userName, message }) {
    this.socket.emit(EVENT_SEND_MESSAGE, { roomName, userName, message });
  }

  emitReplay({ roomName, userName }) {
    this.socket.emit(EVENT_SEND_REPLAY, { roomName, userName });
  }

  emitCancelLiveStream({ userName, roomName }) {
    this.socket.emit(EVENT_CANCEL_LIVE_STREAM, { userName, roomName });
  }

  emitGetStreamCards() {
    this.socket.emit(EVENT_GET_STREAM_CARDS);
  }

  emitJoinNotification({ enteredViewerName, roomName }) {
    this.socket.emit(EVENT_JOIN_NOTIFICATION, { enteredViewerName, roomName });
  }
}

const instance = new SocketManager();
Object.freeze(instance);

export default SocketManager;
