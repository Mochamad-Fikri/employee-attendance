import { useRouter } from "expo-router";
import {
  ArrowRight,
  Badge,
  Building2,
  Eye,
  EyeOff,
  Fingerprint,
  Lock,
  ShieldCheck,
} from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  // States
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Handle Normal Login
  const handleLogin = () => {
    // Implementasi validasi login di sini jika ada
    router.replace("/verify"); // Pindah ke HomeScreen tanpa bisa back ke Login
  };

  // Handle Quick Biometric Login
  const handleBiometricLogin = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      router.replace("/verify");
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCF9F8" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* --- TOP BRANDING & HEADER --- */}
          <View style={styles.headerContainer}>
            {/* App Emblem / Logo */}
            <View style={styles.logoBox}>
              <Building2 size={32} color="#FFFFFF" />
            </View>

            <Text style={styles.brandTitle}>PRESENSI KARYAWAN</Text>
            <Text style={styles.mainTitle}>Masuk Ke Akun Anda</Text>
            <Text style={styles.subTitle}>
              Silakan Masukkan Email & Kata Sandi Untuk Melanjutkan Presensi
              Kerja Hari Ini .
            </Text>
          </View>

          {/* --- AUTHENTICATION CARD --- */}
          <View style={styles.formCard}>
            {/* Field 1: Email / NIK */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputWrapper}>
                <Badge size={20} color="#717970" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Namalengkap@gmail.com"
                  placeholderTextColor="#9CA3AF"
                  value={identifier}
                  onChangeText={setIdentifier}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Field 2: Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Kata Sandi</Text>
              <View style={styles.inputWrapper}>
                <Lock size={20} color="#717970" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Masukkan Kata Sandi"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#717970" />
                  ) : (
                    <Eye size={20} color="#717970" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Meta Links */}
            <View style={styles.metaRow}>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Lupa Kata Sandi?</Text>
              </TouchableOpacity>
            </View>

            {/* Primary CTA: Masuk Sekarang */}
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Masuk Sekarang</Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Biometric Button */}
            <View style={styles.biometricSection}>
              <TouchableOpacity
                style={styles.biometricButton}
                activeOpacity={0.8}
                onPress={handleBiometricLogin}
                disabled={isScanning}
              >
                <Fingerprint size={22} color="#1E5631" />
                <Text style={styles.biometricButtonText}>
                  {isScanning
                    ? "Memindai Sidik Jari / Wajah..."
                    : "Masuk Cepat Dengan Biometrik"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* --- FOOTER & SUPPORT --- */}
          <View style={styles.footerContainer}>
            <View style={styles.securityRow}>
              <ShieldCheck size={14} color="#717970" />
              <Text style={styles.securityText}>
                Dilindungi Enkripsi SSL 256-Bit • Sistem Presensi
              </Text>
            </View>

            <TouchableOpacity style={styles.helpdeskRow}>
              <Text style={styles.helpdeskText}>
                Kendala akun atau lupa NIK?{" "}
                <Text style={styles.helpdeskLink}>Hubungi HR / IT Support</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F8",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: "center",
  },

  /* HEADER BRANDING */
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F3F2",
    borderWidth: 1,
    borderColor: "#C0C9BE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 16,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#256D00",
  },
  statusText: {
    fontSize: 12,
    color: "#414941",
    fontWeight: "600",
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#1E5631",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  brandTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1E5631",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1B1B",
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 13,
    color: "#414941",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 12,
  },

  /* FORM CARD */
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#C0C9BE",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1B1B",
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C0C9BE",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    height: 48,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: "#1C1B1B",
  },
  eyeButton: {
    padding: 4,
  },
  metaRow: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E5631",
  },
  loginButton: {
    height: 52,
    backgroundColor: "#1E5631",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#1E5631",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  /* BIOMETRIC & SSO */
  biometricSection: {
    marginTop: 14,
  },
  biometricButton: {
    height: 48,
    backgroundColor: "#F6F3F2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0C9BE",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  biometricButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1B1B",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#C0C9BE",
  },
  dividerText: {
    fontSize: 11,
    color: "#717970",
    paddingHorizontal: 10,
    fontWeight: "600",
  },
  ssoButton: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0C9BE",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  ssoButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1B1B",
  },

  /* FOOTER */
  footerContainer: {
    marginTop: 24,
    alignItems: "center",
    gap: 8,
  },
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  securityText: {
    fontSize: 10,
    color: "#717970",
    fontWeight: "600",
  },
  helpdeskRow: {
    paddingVertical: 4,
  },
  helpdeskText: {
    fontSize: 12,
    color: "#414941",
  },
  helpdeskLink: {
    fontWeight: "600",
    color: "#1E5631",
  },
});
