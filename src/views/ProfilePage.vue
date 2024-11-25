<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Profile</ion-title>
                <ion-button slot="end" fill="clear" @click="logout" style="--color: gray;">
                    <ion-icon slot="end" :icon="exit"></ion-icon>
                    <ion-label>Logout</ion-label>
                </ion-button>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div id="avatar-container">
                <ion-avatar class="profile-avatar">
                    <img 
                        :alt="user?.displayName || 'Avatar'" 
                        :src="userPhotoUrl" 
                        @error="handleImageError"
                        referrerpolicy="no-referrer"
                        crossorigin="anonymous"
                    />
                </ion-avatar>
            </div>

            <ion-list>
                <ion-item>
                    <ion-input label="Nama" :value="user?.displayName" readonly></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input label="Email" :value="user?.email" readonly></ion-input>
                </ion-item>
            </ion-list>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonInput, 
    IonItem, 
    IonList, 
    IonLabel, 
    IonIcon, 
    IonButton, 
    IonAvatar 
} from '@ionic/vue';
import { exit } from 'ionicons/icons';
import { computed, watchEffect } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

// Tambahkan proxy URL jika diperlukan
const userPhotoUrl = computed(() => {
    if (!user.value?.photoURL) {
        return 'https://ionicframework.com/docs/img/demos/avatar.svg';
    }
    // Return URL asli karena kita sudah menangani dengan referrerpolicy
    return user.value.photoURL;
});

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.src = 'https://ionicframework.com/docs/img/demos/avatar.svg';
};

const logout = () => {
    authStore.logout();
};

// Debug untuk memastikan URL
watchEffect(() => {
    if (user.value?.photoURL) {
        console.log('Photo URL loaded:', user.value.photoURL);
    }
});
</script>

<style scoped>
#avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

.profile-avatar {
    width: 120px !important;
    height: 120px !important;
    border: 2px solid #ddd;
    overflow: hidden;
}

.profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>