import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class AESStuff {
    //Runnable on command line (if needed in AWS Shell)
    // Encrypts w AES
    public static String encrypt(String plainText, String secretKey) throws Exception {
        // create AES key from secret key
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(), "AES");

        // initialize cipher
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, keySpec);

        // encrypt
        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes());

        // convert encrypted bytes into a base64 string (easy for storing/transmission)
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    // decrypts cipher text
    public static String decrypt(String cipherText, String secretKey) throws Exception {
        // create AES key from secret key
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(), "AES");

        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, keySpec);

        // decode the Base64
        byte[] decodedCipherText = Base64.getDecoder().decode(cipherText);

        // decrypt
        byte[] decryptedBytes = cipher.doFinal(decodedCipherText);

        // convert decrypted back to text
        return new String(decryptedBytes);
    }

    public static void main(String[] args) {
        try {
            String secretKey = "1234567890123456";


            String plainText = "Hello, AES Encryption!";


            String encryptedText = encrypt(plainText, secretKey);
            System.out.println("Encrypted Text: " + encryptedText);

            String decryptedText = decrypt(encryptedText, secretKey);
            System.out.println("Decrypted Text: " + decryptedText);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
