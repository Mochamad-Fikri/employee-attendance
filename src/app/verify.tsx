import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  Eye,
  Home,
  Info,
  ShieldCheck,
  SwitchCamera,
  Zap,
  ZapOff,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function VerifyScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);

  // States
  const [permission, requestPermission] = useCameraPermissions();
  const [attendanceType, setAttendanceType] = useState<"WFO" | "WFH" | "DINAS">(
    "WFO",
  );
  const [facing, setFacing] = useState<CameraType>("front");
  const [flash, setFlash] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  // 1. Request Izin Kamera & Lokasi GPS
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Izin Ditolak",
          "Aplikasi memerlukan izin GPS untuk verifikasi presensi.",
        );
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation);
    })();
  }, [permission]);

  // Toggle Kamera
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  // Toggle Flash
  const toggleFlash = () => {
    setFlash((prev) => !prev);
  };

  // Handle Capture Photo / Verification Real
  const handleCapture = async () => {
    if (!cameraRef.current) {
      Alert.alert("Error", "Kamera belum siap.");
      return;
    }

    try {
      setIsVerifying(true);

      // Ambil foto dari kamera
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: true,
      });

      // Ambil lokasi GPS terkini
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const payload = {
        attendance_type: attendanceType,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        accuracy: currentLocation.coords.accuracy,
        photo_uri: photo?.uri,
        timestamp: new Date().toISOString(),
      };

      console.log("Payload Presensi:", payload);

      Alert.alert(
        "Presensi Berhasil!",
        `Status ${attendanceType} berhasil diverifikasi.`,
        [
          {
            text: "OK",
            onPress: () => router.replace("/home"),
          },
        ],
      );
    } catch (error: any) {
      Alert.alert(
        "Gagal Verifikasi",
        error.message || "Terjadi kesalahan saat memproses foto/GPS.",
      );
    } finally {
      setIsVerifying(false);
    }
  };

  if (!permission?.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Aplikasi membutuhkan izin untuk menggunakan Kamera
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Izinkan Kamera</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Verifikasi Presensi</Text>
          <View style={styles.stepContainer}>
            <View style={styles.greenDot} />
            <Text style={styles.stepText}>
              Step 2 dari 2: Verifikasi Wajah & GPS
            </Text>
          </View>
        </View>
        <View style={styles.liveVerifyBadge}>
          <Text style={styles.liveVerifyText}>LIVE VERIFY</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* TAB TYPE SELECTION */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              attendanceType === "WFO" && styles.activeTabButton,
            ]}
            onPress={() => setAttendanceType("WFO")}
          >
            <Building2
              size={16}
              color={attendanceType === "WFO" ? "#FFFFFF" : "#374151"}
            />
            <Text
              style={[
                styles.tabText,
                attendanceType === "WFO" && styles.activeTabText,
              ]}
            >
              WFO
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              attendanceType === "WFH" && styles.activeTabButton,
            ]}
            onPress={() => setAttendanceType("WFH")}
          >
            <Home
              size={16}
              color={attendanceType === "WFH" ? "#FFFFFF" : "#374151"}
            />
            <Text
              style={[
                styles.tabText,
                attendanceType === "WFH" && styles.activeTabText,
              ]}
            >
              WFH
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              attendanceType === "DINAS" && styles.activeTabButton,
            ]}
            onPress={() => setAttendanceType("DINAS")}
          >
            <Briefcase
              size={16}
              color={attendanceType === "DINAS" ? "#FFFFFF" : "#374151"}
            />
            <Text
              style={[
                styles.tabText,
                attendanceType === "DINAS" && styles.activeTabText,
              ]}
            >
              Dinas Luar
            </Text>
          </TouchableOpacity>
        </View>

        {/* LOCATION CARD */}
        <View style={styles.locationCard}>
          <View style={styles.locationLeftRow}>
            <View style={styles.radarGraphic}>
              <View style={styles.radarOuterCircle} />
              <View style={styles.radarInnerDot} />
              <View style={styles.gpsBadge}>
                <Text style={styles.gpsBadgeText}>GPS OK</Text>
              </View>
            </View>

            <View style={styles.locationDetails}>
              <View style={styles.radiusRow}>
                <View style={styles.validRadiusBadge}>
                  <View style={styles.greenDotSmall} />
                  <Text style={styles.validRadiusText}>Radius Valid (18m)</Text>
                </View>
                <Text style={styles.accuracyText}>
                  {location
                    ? `Akurasi ±${Math.round(location.coords.accuracy || 3)}m`
                    : "Memuat GPS..."}
                </Text>
              </View>

              <Text style={styles.officeName}>Head Office Graha BSD</Text>
              <Text style={styles.officeAddress}>
                Jl. Grand Boulevard No. 1, BSD City
              </Text>

              <View style={styles.wifiRow}>
                <ShieldCheck size={14} color="#15803D" />
                <Text style={styles.wifiText}>
                  Terhubung ke Beacon WiFi:{" "}
                  <Text style={styles.wifiBold}>BSD-HQ-EXT02</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* CAMERA VIEW */}
        <View style={styles.cameraCard}>
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing={facing}
            enableTorch={flash}
          >
            <View style={styles.cameraOverlay}>
              <View style={styles.cameraHeaderBadges}>
                <View style={styles.livenessBadge}>
                  <View style={styles.redDot} />
                  <Text style={styles.livenessText}>REC • LIVENESS ACTIVE</Text>
                </View>

                <View style={styles.antispoofBadge}>
                  <ShieldCheck size={12} color="#FFFFFF" />
                  <Text style={styles.antispoofText}>AI Antispoofing</Text>
                </View>
              </View>

              <View style={styles.faceOvalGuide} />

              <View style={styles.instructionBadge}>
                <Eye size={18} color="#A7F3D0" />
                <Text style={styles.instructionText}>
                  Kedipkan mata atau tersenyum untuk verifikasi
                </Text>
              </View>

              <View style={styles.watermarkContainer}>
                <Text style={styles.watermarkText}>
                  🕒 {new Date().toLocaleDateString("id-ID")} LAT:{" "}
                  {location?.coords.latitude.toFixed(4) || "-"} • LNG:{" "}
                  {location?.coords.longitude.toFixed(4) || "-"}
                </Text>
              </View>
            </View>
          </CameraView>
        </View>

        {/* FOOTER HINT */}
        <View style={styles.hintContainer}>
          <Info size={16} color="#4B5563" />
          <Text style={styles.hintText}>
            Pastikan pencahayaan cukup dan wajah terlihat jelas tanpa masker.
          </Text>
        </View>

        {/* CONTROL BUTTONS */}
        <View style={styles.controlCard}>
          <TouchableOpacity
            style={styles.iconCircleButton}
            onPress={toggleFlash}
          >
            {flash ? (
              <Zap size={20} color="#15803D" />
            ) : (
              <ZapOff size={20} color="#374151" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shutterOuterRing}
            onPress={handleCapture}
            activeOpacity={0.8}
            disabled={isVerifying}
          >
            <View style={styles.shutterInnerButton}>
              <CheckCircle2 size={28} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconCircleButton}
            onPress={toggleCameraFacing}
          >
            <SwitchCamera size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        <Text style={styles.systemVersionText}>
          SISTEM PRESENSI TERINTEGRASI • VERSI 3.4.1
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#16A34A",
    marginRight: 6,
  },
  stepText: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },
  liveVerifyBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveVerifyText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#374151",
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  activeTabButton: {
    backgroundColor: "#166534",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  locationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderLeftWidth: 4,
    borderLeftColor: "#16A34A",
    marginBottom: 12,
  },
  locationLeftRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  radarGraphic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginRight: 12,
  },
  radarOuterCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#16A34A",
    borderStyle: "dashed",
  },
  radarInnerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#15803D",
    position: "absolute",
  },
  gpsBadge: {
    position: "absolute",
    bottom: -2,
    backgroundColor: "#1F2937",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  gpsBadgeText: {
    fontSize: 8,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  locationDetails: {
    flex: 1,
  },
  radiusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  validRadiusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  greenDotSmall: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#16A34A",
    marginRight: 4,
  },
  validRadiusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#14532D",
  },
  accuracyText: {
    fontSize: 10,
    color: "#6B7280",
  },
  officeName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  officeAddress: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 4,
  },
  wifiRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  wifiText: {
    fontSize: 10,
    color: "#15803D",
  },
  wifiBold: {
    fontWeight: "700",
  },
  cameraCard: {
    height: width * 0.9,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#000000",
    position: "relative",
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  cameraHeaderBadges: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
  },
  livenessBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EF4444",
    marginRight: 6,
  },
  livenessText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  antispoofBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  antispoofText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  faceOvalGuide: {
    width: width * 0.55,
    height: width * 0.65,
    borderRadius: (width * 0.55) / 2,
    borderWidth: 2,
    borderColor: "#4ADE80",
    borderStyle: "dashed",
  },
  instructionBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(17, 24, 39, 0.85)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  instructionText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  watermarkContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  watermarkText: {
    color: "#4ADE80",
    fontSize: 9,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  hintContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginVertical: 10,
  },
  hintText: {
    fontSize: 11,
    color: "#4B5563",
    textAlign: "center",
  },
  controlCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  iconCircleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterOuterRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: "#15803D",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  shutterInnerButton: {
    flex: 1,
    width: "100%",
    backgroundColor: "#15803D",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  systemVersionText: {
    textAlign: "center",
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "600",
    letterSpacing: 0.8,
    marginTop: 12,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 16,
    color: "#374151",
  },
  permissionButton: {
    backgroundColor: "#16A34A",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
