# O2OClient

Huong dan chay ung dung Expo tren may tinh va dien thoai.

## Yeu cau

- Node.js LTS
- Expo Go tren dien thoai (Android/iOS)
- Dien thoai va PC cung mang Wi‑Fi

## Cai dat

### Buoc 1: Mo terminal

Tren Windows, mo PowerShell hoac Terminal trong VS Code.

### Buoc 2: Vao thu muc du an

```
cd d:\hungnx7\O2OCare\O2OClient
```

### Buoc 3: Neu bi loi "running scripts is disabled"

Neu thay loi:

```
... running scripts is disabled on this system ...
```

Chay lenh sau mot lan (chi can 1 lan cho user hien tai):

```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Sau do dong PowerShell, mo lai, va lam tiep buoc 4.

### Buoc 4: Cai dat thu vien

Chay lenh tai thu muc `O2OClient`:

```
npm install --legacy-peer-deps
```

## Chay ung dung

### Buoc 5: Bat Expo dev server

```
npm run start
```

Sau khi Expo chay:

1. Trong terminal Expo, nhan `c` de clear cache neu can.
2. Nhan `?` de hien menu, thuong se co QR code.
3. Mo Expo Go tren dien thoai va quet QR code.

Neu khong thay QR code:

- Bao dam Expo dev server dang chay tren `http://localhost:8081`.
- Nhan `w` de mo web, `a` de mo Android emulator (neu co).
- Mo Expo DevTools: vao `http://localhost:19002` (hoac `http://localhost:8081`) de xem QR.
- Bao dam dien thoai cung mang Wi‑Fi va khong bi firewall chan.

## Ghi chu

Neu loi phu thuoc, hay cai dat lai voi `--legacy-peer-deps` nhu tren.

Neu port bi dung (8081/8083), co the chay:

```
npx expo start --clear --port 8084
```

Hoac dung `npm run start` va dong cac server Expo cu dang chay.
