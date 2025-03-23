@ReactMethod
public void readBlobInBackground(ReadableMap blob, Promise promise) {
  new Thread(new Runnable() {
    @Override
    public void run() {
      try {
        byte[] bytes = Base64.decode(blob.getString("data"), Base64.DEFAULT);
        String base64String = Base64.encodeToString(bytes, Base64.NO_WRAP);
        promise.resolve(base64String);
      } catch (Exception e) {
        promise.reject("Error", e);
      }
    }
  }).start();
}
