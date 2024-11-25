# Operasi CRUD Aplikasi Todo

## Create (Menambahkan Todo)
```typescript
const handleSubmit = async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
  if (!todo.title) {
    await showToast('Judul diperlukan', 'warning', checkmarkCircle);
    return;
  }
  try {
    await firestoreService.addTodo(todo as Todo);
    await showToast('Todo berhasil ditambahkan', 'success', checkmarkCircle);
    loadTodos();
  } catch (error) {
    await showToast('Terjadi kesalahan', 'danger', close);
  }
};
```

**Penjelasan Create:**
- Fungsi `handleSubmit` dipanggil saat pengguna mengirimkan todo baru
- Melakukan validasi dasar: memastikan judul todo tidak kosong
- Menggunakan `firestoreService.addTodo()` untuk menyimpan todo ke Firestore
- Menampilkan toast untuk memberi umpan balik pada pengguna
- Memuat ulang daftar todo setelah penambahan berhasil

## Read (Membaca Todo)
```typescript
const loadTodos = async (isLoading = true) => {
  let loading;
  if (isLoading) {
    loading = await loadingController.create({
      message: 'Memuat...'
    });
    await loading.present();
  }

  try {
    todos.value = await firestoreService.getTodos();
  } catch (error) {
    console.error(error);
  } finally {
    if (loading) {
      await loading.dismiss();
    }
  }
};
```

**Penjelasan Read:**
- Fungsi `loadTodos` bertanggung jawab mengambil semua todo dari Firestore
- Menampilkan loading controller selama proses pengambilan data
- Menyimpan todo yang diambil ke dalam variabel `todos`
- Menangani kesalahan pengambilan data dengan pencatatan error
- Mendukung loading opsional dengan parameter `isLoading`

## Update (Memperbarui Todo)
### 1. Memperbarui Detail Todo
```typescript
const handleEdit = async (editTodo: Todo) => {
  const slidingItem = itemRefs.value.get(editTodo.id!);
  await slidingItem?.close();

  editingId.value = editTodo.id!;
  todo.value = {
    title: editTodo.title,
    description: editTodo.description,
  }
  isOpen.value = true;
}
```

**Penjelasan Update Detail:**
- Membuka modal edit dengan data todo yang dipilih
- Menutup sliding item untuk mencegah interaksi bersamaan
- Menyimpan ID todo yang akan diedit
- Mengisi ulang form dengan data todo eksisting

### 2. Memperbarui Status Todo
```typescript
const handleStatus = async (statusTodo: Todo) => {
  const slidingItem = itemRefs.value.get(statusTodo.id!);
  await slidingItem?.close();
  try {
    await firestoreService.updateStatus(statusTodo.id!, !statusTodo.status);
    await showToast(
      `Todo ditandai sebagai ${!statusTodo.status ? 'selesai' : 'aktif'}`,
      'success',
      checkmarkCircle
    );
    loadTodos();
  } catch (error) {
    await showToast('Gagal memperbarui status', 'danger', close);
  }
};
```

**Penjelasan Update Status:**
- Mengubah status todo antara aktif dan selesai
- Menutup sliding item
- Menggunakan `updateStatus()` untuk memperbarui status di Firestore
- Menampilkan toast dengan konfirmasi perubahan status
- Memuat ulang daftar todo setelah perubahan

## Delete (Menghapus Todo)
```typescript
const handleDelete = async (deleteTodo: Todo) => {
  try {
    await firestoreService.deleteTodo(deleteTodo.id!);
    await showToast('Todo berhasil dihapus', 'success', checkmarkCircle);
    loadTodos();
  } catch (error) {
    await showToast('Gagal menghapus todo', 'danger', close);
  }
};
```

**Penjelasan Delete:**
- Menghapus todo yang dipilih menggunakan `deleteTodo()`
- Menampilkan toast sukses atau gagal
- Memuat ulang daftar todo setelah penghapusan

## Screenshots
<img width="213" alt="image" src="https://github.com/user-attachments/assets/fb032000-e0b2-4d08-b60d-8022209d56b4">
<img width="218" alt="image" src="https://github.com/user-attachments/assets/9c0ef692-320a-4c43-ad25-8121a65f7380">

