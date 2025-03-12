<script setup>
import Loader from "../Loader.vue";
import { computed, nextTick, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import io from 'socket.io-client';
import axios from 'axios';
import ChatShow from './ChatShow.vue';
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { useChatStore } from '@/stores';
import moment from 'moment';
import Avatar from '../../assets/img/profile_avater.png'
const BASE_URL = 'http://myapi.test';
const otherCustomerId = ref('');
const otherCustomerType = ref('');
const customerChatId = ref('');
const updatedchats = useChatStore();
const props = defineProps({
  chats: {
    type: Array,
    default: () => [],
  },
  auth: {
    type: Object,
    default: () => ({}),
  },
  type: String,
  socketUrl: {
        type: String
    },
});

var receiver_image  =  ''
const filevalue = ref('');
const showPreview = ref(false);
const showMessages = ref(false);
const activeChat = ref(null);
const backUrl = '/';
const isOnline = ref(false);
const isMessagePanelShow = ref(false);
const messageAreaRef = ref(null);
const addOnlineClass = ref('');
const ProfileInfo = ref([]);
const searchQuery = ref('');  // Search query state
const chatData = ref([]);  // Store all chats
const filteredChats = ref([]);
const onlineStatus = ref('');
const onlineUsers = ref([]);
const showEmoji = ref(false);
const emojiPickerRef = ref('');
const closedChat= ()=>{
    showMessages.value = false;
}
const getAllUpdatedChats = async () => {
  try {
    const res = await updatedchats.chats(); // Fetch chat data
    chatData.value = res.data.data || []; // Ensure it's an array
    filteredChats.value = chatData.value; // Initialize filtered chats
  } catch (error) {
    console.error("Dashboard fetch failed:", error);
  }
};
defineEmits(['loadMessage'])

let fileInput = document.querySelector("#fileInput");
fileInput?.removeEventListener('change', handleFileUpload);
fileInput?.addEventListener('change', handleFileUpload);
var  file =   '';

// function handleFileUpload(e) {
//    showEmoji.value = false;
//    file = e.target.files[0];
//     if (file) {
//         showPreview.value = true;
//     }

//     let picturePreview = document.querySelector(".imagePreview");
//     let sendButton = document.querySelector('.sendmessagechatbox_btn');
//     let fileReader = new FileReader();

//     fileReader.readAsDataURL(file);
//     fileReader.onload = (e) => {
//         picturePreview.src = e.target.result;
//     }

//     sendButton.addEventListener('click', function (e) {
//         console.log(file);
//         if (file) {
//             removeImage();
//             uploadFile(file);
//         }
//         file = ''
//     });
// }

function handleFileUpload(e) {
    showEmoji.value = false;
    let file = e.target.files[0];
    
    if (!file) return;
    
    

    let picturePreview = document.querySelector(".imagePreview");
    let picturePreviewPdf = document.querySelector(".imagePreviewpdf");
    let sendButton = document.querySelector('.sendmessagechatbox_btn');
    let fileReader = new FileReader();

    if (file.type.startsWith("image/")) {
        // If it's an image
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
            picturePreview.style.display = "block";  // Show image preview
            picturePreviewPdf.style.display = "none"; // Hide PDF preview
            picturePreview.src = e.target.result;
        };
    } else if (file.type === "application/pdf") {
        // If it's a PDF
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
            picturePreviewPdf.style.display = "block"; // Show PDF preview
            picturePreview.style.display = "none"; // Hide image preview
            picturePreviewPdf.src = e.target.result;
        };
    } else {
        alert("Unsupported file type! Please upload an image or a PDF.");
        return false;
    }
    showPreview.value = true;
    sendButton.addEventListener('click', function () {
        console.log(file);
        if (file) {
            removeImage();
            uploadFile(file);
        }
        file = '';
    });
}

function appendMessageFile(msg, class1, class2) {
    let textarea = document.querySelector('#message');
    let sendButton = document.querySelector('.sendmessagechatbox_btn');
    let messageArea = document.querySelector('.chat_wrapper_inner');
    let mainDiv = document.createElement('div');
        mainDiv.classList.add(class1, 'message_box_chat_inner','message', class2);

        let markup = `
       ${( props.type == msg.sender_model) ? '' : `<img src="${receiver_image}" class="sender-img" alt="Profile" />`}

                                <div>
                                <div class="multiple-incoming">
                                    <div class="message-content">
                                    <div class="message-text">
                                     ${(msg.message_type == 2) ?
                                        `<img  onclick="showModel('${msg.file_path}')" data-toggle="modal" data-target="#exampleModal" src="${BASE_URL+'/' + msg.file_path}" height="100" width="100" />`
                                        : (msg.message_type == 4) ?
                                        `<video controls width="100%" height="100%">
                                            <source src="${'/' + msg.file_path}" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>`
                                        : (msg.message_type == 5) ?
                                        `<embed src="${'/' + msg.file_path}" width="100%" height="100%">`
                                        : (msg.file_path) ? `<img src=${'/' + msg.file_path} height="100" width="100" />` : msg.message}
                                    </div>
                                    </div>
                                    <small class="text-muted">${timeFormat(msg.created_at)}</small>
                                </div>
                                </div>
    `;

        mainDiv.innerHTML = markup

        messageArea.appendChild(mainDiv);
        messageText.value = '';
        showEmoji.value = false;
        nextTick(() => {
            messageAreaRef.value.scrollTop = messageAreaRef.value.scrollHeight;
        });
    }

function uploadFile(file) {
    const socket = io(props.socketUrl);
    var message_type = 5;
    const formData = new FormData();
    formData.file_path = file;
    const fileType = getFileType(file.name);
    if (fileType == 'pdf' || fileType == 'doc' || fileType == 'docx') {

        formData.append('type', 5);
        message_type =5;
    } else if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'webp') {
        formData.append('type', 2);
        message_type =2;
    } else if (fileType == 'mp4' || fileType == 'mov') {
        formData.append('type', 4);
        message_type =4;
    } else {
        formData.append('type', 2);
        message_type =2;
    }

    const imageFile = file;

    formData.append('file', imageFile);
    const url = 'http://auth-vue-api.test/api/chats/messages/upload';
    axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
 
    let msg = {
            sender_id: props.auth.id,
            sender_model:props.type,
            receiver_model: otherCustomerType.value,
            receiver_id: otherCustomerId.value,
            message: '',
            created_at: new Date(),
            message_type: message_type,
            file_path: response.data.data,
        };
        file = '';
        appendMessageFile(msg, 'sent_message', 'outgoing');
        socket.emit('message', msg);
        getAllUpdatedChats();
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });

}


function getFileType(fileName) {
    const extension = fileName.split('.').pop();
    return extension.toLowerCase();
}

function sendRunTimeMessage() {
    const socket = io(props.socketUrl);
   
    setTimeout(() => {
    socket.emit('connect_user', {
        user_id: props.auth.id,
        user_model: props.auth.type,
    });
  }, 1000);
  socket.on("updateChatList", function (data) {
        getAllUpdatedChats();
    });
    let textarea = document.querySelector('#message');
    let sendButton = document.querySelector('.sendmessagechatbox_btn');
    let messageArea = document.querySelector('.chat_wrapper_inner');
    textarea?.addEventListener('keyup', function (e) {
        if (e.key == "Enter") {
            sendMessage(e.target.value);
        }
    });

    sendButton.addEventListener('click', function (e) {
        if (textarea.value != '') {
            sendMessage(textarea.value);
        }
    });

    function sendMessage(message) {
        if (message == '') {
            return;
        }
        let msg = {
            sender_id: props.auth.id,
            sender_model: props.auth.type,
            receiver_model: otherCustomerType.value,
            receiver_id: otherCustomerId.value,
            message: message,
            created_at: new Date(),
        };

        textarea.value = '';
        appendMessage(msg, 'sent_message', 'outgoing');
      //  Push notification here 
        socket.emit('message', msg);
        socket.emit('count_message', msg);
        getAllUpdatedChats();
    }
 // sendPushNotification(props.auth.id,otherCustomerId.value,'','');

    socket.on('message', async function (msg) {
      var pay = { sender_id: msg.sender_id };
        await axios.get('http://auth-vue-api.test/api/chats/sender-name',{
            params: pay  // Send parameters correctly
        })
            .then(response => {
                msg.sender_name = response.data.data.name;
            })
            .catch(error => console.log(error));
     
        if (otherCustomerId.value == msg?.sender_id) {
      
            appendMessage(msg, 'recieve_message', 'incoming')
        }
        nextTick(() => {
            messageAreaRef.value.scrollTop = messageAreaRef.value.scrollHeight;
        });
    });

    function appendMessage(msg, class1, class2) {
        let mainDiv = document.createElement('div');
        mainDiv.classList.add(class1, 'message_box_chat_inner','message', class2);

        let markup = `
       ${( props.type == msg.sender_model) ? '' :  `<img src="${receiver_image}" class="sender-img" alt="Profile" />`}
                                <div>
                                <div class="multiple-incoming">
                                    <div class="message-content">
                                    <div class="message-text">
                                     ${(msg.message_type == 2) ?
                                        `<img src="${'/' + msg.file_path}" height="100" width="100" />`
                                        : (msg.message_type == 4) ?
                                        `<video controls width="100%" height="100%">
                                            <source src="${'/' + msg.file_path}" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>`
                                        : (msg.message_type == 5) ?
                                        `<embed src="${BASE_URL +'/'+ msg.file_path}" width="100%" height="100%">`
                                        : (msg.file_path) ? `<img src=${BASE_URL +'/' + msg.file_path} height="100" width="100" />` : msg.message}
                                    </div>
                                    </div>
                                    <small class="text-muted">${timeFormat(msg.created_at)}</small>
                                </div>
                                </div>
    `;

        mainDiv.innerHTML = markup
        messageArea.appendChild(mainDiv);
        messageText.value = '';
        showEmoji.value = false;
        nextTick(() => {
            messageAreaRef.value.scrollTop = messageAreaRef.value.scrollHeight;
        });
    }
}
async function getOtherUserProfile(otherUserId) {
  const response = await updatedchats.info( { chat_id: otherUserId });
  ProfileInfo.value = response.data.data;
  otherCustomerType.value =response.data.data.type;
  receiver_image = ProfileInfo.value?.profile_image? BASE_URL+ProfileInfo.value?.profile_image:Avatar;
}
async function sendPushNotification(senderId, receiverId = null, receiverModel = null, senderModel = null) {
      let endPoint =  `https://app.focussubs.com/api/sendMessageNotification?sender_id=${senderId}&receiver_id=${receiverId}`;
      await axios.get(endPoint).then((response) => {
        console.log("chat response: ", response.data);
      }).catch((error) => {
        console.log("error axios", error);
      });
    }

async function loadMessage(otherUserId, currentUser, chatId, index) {
   
    activeChat.value = chatId;
    showEmoji.value = false;
    showMessages.value = true;
    let picturePreview = document.querySelector(".imagePreview");
    picturePreview.src = '';
    showPreview.value = false;
    getOtherUserProfile(otherUserId);
    isLoad.value = true;
    isMessagePanelShow.value = true;
    otherCustomerId.value = otherUserId;
    customerChatId.value = chatId;
    let messageArea = document.querySelector('#show-messages');
    let infoArea = document.querySelector('#show-info');
    messageArea.innerHTML = '';
    infoArea.innerHTML = '';
   const  responses = await updatedchats.messages({ 'other_user_id': otherUserId,'page':1,'per_page':10 });
   if (responses.data.data) {
                let data = responses.data.data;
                let infoDiv = document.createElement('div');
                infoDiv.classList.add('users_chat_list_box_cselem', 'active','chat-header');
                let senderName = ProfileInfo.value.name;

                infoDiv.innerHTML = `<div class="candidate-status">
               <img class="rounded-circle mr-3" style="width: 64px;
                      height: 64px;"  src="${ProfileInfo.value?.profile_image ? BASE_URL+ProfileInfo.value?.profile_image : Avatar}" alt="" />
                <div>
                  <h6 class="candidate-status-name">${senderName}</h6>
                  <p class="${onlineUsers.value.find(e => e.user_id == ProfileInfo.value.id) ? 'candidate-status-status' : ''}">${onlineUsers.value.find(e => e.user_id == ProfileInfo.value.id) ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div class="chat-actions">

              </div>`;
                infoArea.appendChild(infoDiv);
                data.forEach(function (item) {

                    if (item) {
                        let messageDiv = document.createElement('div');
                        messageDiv.classList.add('message_box_chat_inner');
                        if (props.type == item.sender_model) {

                            messageDiv.classList.add('sent_message','message','outgoing');
                        } else {
                            messageDiv.classList.add('recieve_message', 'message','incoming');
                        }
                        messageDiv.innerHTML = `
                      ${(props.type === item.sender_model) ? '' : `<img src="${item.sender.profile_image ? BASE_URL+item.sender.profile_image:Avatar}" class="sender-img" alt="Profile" />`}


                                <div>
                                <div class="multiple-incoming">
                                    <div class="message-content">
                                    <div class="message-text">
                                      ${(item.message_type == 2) ?
                                        `<img onclick="showModel('${item.file_path}')" data-toggle="modal" data-target="#exampleModal" src="${BASE_URL+'/' + item.file_path}" height="100" width="100" />`
                                        : (item.message_type == 4) ?
                                        `<video controls width="100%" height="100%">
                                            <source src="${'/' + item.file_path}" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>`
                                        : (item.message_type == 5) ?
                                        `<embed src="${BASE_URL +'/' + item.file_path}" width="100%" height="100%">`
                                        : (item.file_path) ? `<img src=${BASE_URL +'/' + item.file_path} height="100" width="100" />` : item.message}
                                    </div>
                                    </div>
                                    <small class="text-muted">${timeFormat(item.created_at)}</small>
                                </div>
                                </div>
                        `;

                        messageArea.appendChild(messageDiv);
                        isLoad.value = false;
                    }
                });

                nextTick(() => {
                    messageAreaRef.value.scrollTop = messageAreaRef.value.scrollHeight;
                });
                isLoad.value = false;
            }

}

watch(
    () => otherCustomerId.value,
    () => otherCustomerType.value,
    () => sendRunTimeMessage()
)

function checkOnlineUsers(data) {
    onlineUsers.value = data.filter(e => e.user_model == props.type);
}

onMounted(() => {
    const socket = io(props.socketUrl);
 
    // setTimeout(() => {
    //     socket.emit('connect_user', {
    //     user_id: props.auth.id,
    //     user_model: props.type,
    //     });
    // }, 1000);
    // if(page.props.new_one)
    // {}else{
    // socket.emit('connect_user', {
    //     user_id: auth.id,
    //     user_model: type,
    // });}
    // if(page.props.new_one)
    // {
    //     activeChat.value = page.props.chat_id;
    //     loadMessage(page.props.other_user_id,'',page.props.chat_id,'');
    // }
    setTimeout(() => {
      socket.on("updateChatList", function (data) {
          getAllUpdatedChats();
      });
    }, 1000);

    socket.on("updateOnlineUsers", function (data) {
        checkOnlineUsers(data);
    });
    socket.on("forceFullyUpdateChatList", function(data) {
        window.location.reload();
    });
    showPreview.value = false;
    let picturePreview = document.querySelector(".imagePreview");
    picturePreview.src = '';
    getAllUpdatedChats();
    sendRunTimeMessage();
});

const isLoad = ref(false);
function removeImage() {
 
  
  let fileInput = document.querySelector("#fileInput");
  fileInput.value = null;
  let picturePreview = document.querySelector(".imagePreview");

  picturePreview.src = '';
  showPreview.value = false;  

  picturePreview.style.display = "none";
  let picturePreviewPdf = document.querySelector(".imagePreviewpdf");
  picturePreviewPdf.style.display = "none";
}

function showEmojiBox() {
  console.log('sssss');
    showEmoji.value = !showEmoji.value;
}

const messageText = ref('');

function onSelectEmoji(emoji) {
    messageText.value += emoji.i;
}
function filterChats() {
  if (!searchQuery.value) {
    filteredChats.value = chatData.value;  // Show all chats if there's no query
  } else {
    filteredChats.value = chatData.value.filter(chat =>
    chat?.user?.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
}

function getCurrentTime()
{
    return moment().format('h:mm A');
}

function getCurrentDateTime()
{
    return moment().format('MM/DD/YY h:mm A');
}

function dateFromat(datetime)
{
    return moment(datetime,'YYYY-MM-HH:mm:ss').format('MM/DD/YY h:mm A');
}
function timeFormat(datetime)
{
    return moment(datetime,'YYYY-MM-DD HH:mm:ss').format('h:mm A');
}
</script>
<template>
  <Loader v-if="isLoad" />
  <div class="findsubs-single-page chat-page">
    <!-- <div class="container nav-container">
      <div class="slug">
        <span><</span>
        <a :href="backUrl">Back</a>
      </div>
    </div> -->
    <div class="container chat-main-container">
      <!-- <h2>Message</h2> -->
      <div class="chat-container">
        <!-- Sidebar -->
        <div id="" class="sidebar">
          <img class="tab-icon" src="/src/assets/img/globe.svg" alt="" />
          <div class="responsive-close">
            <!-- Search Bar -->
            <div class="search">
              <input
                type="text"
                v-model="searchQuery"
                @input="filterChats"
                class="form-control"
                placeholder="Search"
              />
              <img src="/src/assets/img/mag-search.svg" alt="" />
            </div>
            <!-- Tabs for Personal and Group -->
            <div class="tab-container">
              <div class="tab active" id="all-tab">All</div>
              <!-- <div class="tab" id="personal-tab">Personal</div>
            <div class="tab" id="group-tab">Group</div> -->
            </div>

            <!-- Contact List -->
            <div class="contact-list">
              <ChatShow
                :activeChat="activeChat"
                :checkOnlineUsers="onlineUsers"
                :chats="filteredChats.length > 0 ? filteredChats : chatData"
                @load-message="loadMessage"
                :auth="props.auth"
              />
            </div>
          </div>
        </div>

        <!-- Chat Section -->
        <div
          class="chat-section"
          :class="{ 'd-flex': showMessages, 'd-none': !showMessages }"
        >
          <!-- Chat Header -->
          <div
            class="top_box_inner"
            id="show-info"
            :class="{ 'd-block': showMessages, 'd-none': !showMessages }"
          ></div>

          <!-- Chat Body -->
          <div
            class="chat-body chat_wrapper_inner"
            id="show-messages"
            ref="messageAreaRef"
          >
            <!-- Incoming Message -->

            <!-- Chat Footer -->
          </div>
          <div class="chat-footer">
        
            <!-- <i class="fa-solid fa-microphone"></i> -->

            <div class="send-msg">
             
              <input
                type="text"
                v-model="messageText"
                id="message"
                class="form-control form-control rounded-pill"
                placeholder="Type a message ..."
                aria-label="Type a message ..."
                aria-describedby="basic-addon2"
              />
              <button class="rounded-pill sendmessagechatbox_btn" style="background: rebeccapurple;" >
                <img src="/src/assets/img/Icon-Send.svg" alt="" />
              </button>
            </div>

            <div class="input-group-append" style="display: flex">
              <input
                type="file"
                class="btn"
                @change="handleFileUpload"
                id="fileInput"
                style="display: none"
              />
              <label for="fileInput" class="custom-file-upload">
                <i class="fa-solid fa-paperclip"></i>
              </label>
              
              <a @click="showEmojiBox()" style="cursor: pointer;"><i class="fa-solid fa-face-smile "></i></a>
              <a @click="closedChat" style="cursor: pointer;"><i class="fa-solid fa-xmark"></i></a>
            
            <EmojiPicker v-if="showEmoji" ref="emojiPickerRef" style="display:inline-flex" :native="true" @select="onSelectEmoji" />
              
            </div>
            <!-- Image FOr  -->
                        <div class="bottom_box_inner" style="position: relative">
                          <embed src="" class="imagePreviewpdf" style="display: none;" type=""  >
                          <img
                            style="width: 100px; height: 100px; border-radius: 14%;display:none"                            alt="Profile picture preview"
                            class="imagePreview"
                          />
                          <button
                            @click="removeImage"
                            class="close-upload"
                            v-if="showPreview"
                          >
                            &#10006;
                          </button>
                        </div>


          </div>
        </div>
      </div>
    </div>
  </div>

 
</template>
