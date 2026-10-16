import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Badge,
  Bell,
  BookOpen,
  Building2,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  FileText,
  Fingerprint,
  Headphones,
  History as HistoryIcon,
  Home as HomeIcon,
  Languages,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Radio,
  Settings,
  ShieldCheck,
  Smartphone,
  User,
  Users,
} from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  // Switch States
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
  const [isReminderEnabled, setIsReminderEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      "Keluar Akun",
      "Apakah Anda yakin ingin keluar dari sesi presensi ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Keluar",
          style: "destructive",
          onPress: () => router.replace("/login" as any),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* --- TOP APP BAR HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.iconBackBtn}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#1C1B1B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil Saya</Text>
        </View>

        <TouchableOpacity style={styles.iconHeaderBtn}>
          <Settings size={22} color="#1C1B1B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- PROFILE HERO CARD --- */}
        <View style={styles.heroCard}>
          <View style={styles.topAccentRibbon} />

          <View style={styles.heroMainRow}>
            {/* Avatar Cluster */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarCircle}>
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBta7CWfFfqkmpbBDhtVkEe6kTMRJkd-1hjJ1mGiN7N_Hh9fLlRMTKIgg21QDwOlayxJRltX6qXw-OHvNs4HE4TK3QjzywH-N1OpQ4pjEeyZpVWGOgF863Q5JiongFJMyxEcfBFTjNtfsbyM8i5MYR5vAq-vSSbJzfPpOt4Xwo_wFTERJoo6Pyno2O5HQ5m38AMUnrV8ds5Y8h6SMPYfmWaehkEuiTkhsYwN47sN0yIcHVVwPZhdSCK",
                  }}
                  style={styles.avatarImage}
                />
              </View>
              <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
                <Camera size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Employee Attributes */}
            <View style={styles.heroDetails}>
              <View style={styles.employmentChip}>
                <View style={styles.greenDot} />
                <Text style={styles.employmentChipText}>
                  Karyawan Tetap (Full-time)
                </Text>
              </View>
              <Text style={styles.userName} numberOfLines={1}>
                David Ginola
              </Text>
              <Text style={styles.userRole} numberOfLines={1}>
                Software Engineer
              </Text>
              <Text style={styles.userDept} numberOfLines={1}>
                Product & Technology Division
              </Text>
            </View>
          </View>

          {/* Identity Metadata Rows */}
          <View style={styles.metadataContainer}>
            <View style={styles.metadataItem}>
              <Badge size={18} color="#717970" />
              <Text style={styles.metadataText}>NIK: 20241088</Text>
            </View>
            <View style={styles.metadataItem}>
              <Mail size={18} color="#717970" />
              <Text style={styles.metadataText} numberOfLines={1}>
                david.ginola@perusahaan.co.id
              </Text>
            </View>
          </View>

          {/* Quick Edit Action Button */}
          <TouchableOpacity style={styles.editProfileBtn} activeOpacity={0.8}>
            <Edit3 size={18} color="#1C1B1B" />
            <Text style={styles.editProfileBtnText}>Edit Profil Lengkap</Text>
          </TouchableOpacity>
        </View>

        {/* --- BENTO METRIC BAR --- */}
        <View style={styles.metricsGrid}>
          {/* Masa Kerja */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>MASA KERJA</Text>
            <Text style={styles.metricMainValue}>2 Thn 4 Bln</Text>
            <Text style={styles.metricSubText}>Sejak Jan 2022</Text>
          </View>

          {/* Sisa Cuti */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>SISA CUTI</Text>
            <Text style={[styles.metricMainValue, styles.textPrimary]}>
              12 Hari
            </Text>
            <Text style={styles.metricSubText}>Periode 2026</Text>
          </View>

          {/* Disiplin */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>DISIPLIN</Text>
            <Text style={[styles.metricMainValue, styles.textSecondary]}>
              98.5%
            </Text>
            <Text style={[styles.metricSubText, styles.textSecondaryBold]}>
              Predikat Tinggi
            </Text>
          </View>
        </View>

        {/* --- WORK PLACEMENT DETAILS CARD --- */}
        <View style={styles.cardContainer}>
          <View style={styles.accentLeftBar} />
          <View style={styles.cardContent}>
            <View style={styles.cardSectionHeader}>
              <View style={styles.cardTitleCluster}>
                <Building2 size={20} color="#1E5631" />
                <Text style={styles.cardTitleText}>
                  Informasi Penempatan Kerja
                </Text>
              </View>
              <View style={styles.statusActiveBadge}>
                <Text style={styles.statusActiveBadgeText}>Aktif</Text>
              </View>
            </View>

            <View style={styles.placementList}>
              <View style={styles.placementItem}>
                <MapPin size={18} color="#717970" style={{ marginTop: 2 }} />
                <View>
                  <Text style={styles.itemMetaLabel}>KANTOR PENEMPATAN</Text>
                  <Text style={styles.itemMetaVal}>
                    Head Office Graha BSD, Tangerang
                  </Text>
                </View>
              </View>

              <View style={styles.placementItem}>
                <Clock size={18} color="#717970" style={{ marginTop: 2 }} />
                <View>
                  <Text style={styles.itemMetaLabel}>JADWAL SHIFT RESMI</Text>
                  <Text style={styles.itemMetaVal}>
                    Reguler Pagi (08:00 - 17:00 WIB)
                  </Text>
                </View>
              </View>

              <View style={styles.placementItem}>
                <Users size={18} color="#717970" style={{ marginTop: 2 }} />
                <View>
                  <Text style={styles.itemMetaLabel}>
                    ATASAN LANGSUNG (MANAGER)
                  </Text>
                  <Text style={styles.itemMetaVal}>
                    Bambang S. (HR & People Lead)
                  </Text>
                </View>
              </View>

              {/* Geofence Indicator */}
              <View style={styles.telemetryBox}>
                <View style={styles.telemetryLeftRow}>
                  <Radio size={18} color="#256D00" />
                  <View>
                    <Text style={styles.telemetryTitle}>
                      LOKASI PRESENSI TERDAFTAR
                    </Text>
                    <Text style={styles.telemetrySub}>
                      WFO BSD & WFH Terverifikasi
                    </Text>
                  </View>
                </View>
                <CheckCircle2 size={16} color="#256D00" />
              </View>
            </View>
          </View>
        </View>

        {/* --- AKUN & KEAMANAN SECTION --- */}
        <View style={styles.sectionGroup}>
          <Text style={styles.groupHeaderTitle}>AKUN & KEAMANAN</Text>
          <View style={styles.menuGroupCard}>
            {/* Ubah Password */}
            <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
              <View style={styles.menuRowLeft}>
                <View style={styles.iconContainerDefault}>
                  <Lock size={18} color="#1C1B1B" />
                </View>
                <View>
                  <Text style={styles.menuTitleText}>Ubah Kata Sandi</Text>
                  <Text style={styles.menuSubText}>
                    Terakhir diubah 30 hari yang lalu
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color="#717970" />
            </TouchableOpacity>

            {/* Biometric Toggle */}
            <View style={styles.menuRow}>
              <View style={styles.menuRowLeft}>
                <View style={styles.iconContainerGreen}>
                  <Fingerprint size={18} color="#1E5631" />
                </View>
                <View>
                  <Text style={styles.menuTitleText}>
                    Autentikasi Biometrik
                  </Text>
                  <Text style={styles.menuSubText}>
                    Face ID & Fingerprint Clock-In
                  </Text>
                </View>
              </View>
              <Switch
                value={isBiometricEnabled}
                onValueChange={setIsBiometricEnabled}
                trackColor={{ false: "#EAE7E7", true: "#1E5631" }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Registered Device */}
            <View style={[styles.menuRow, { borderBottomWidth: 0 }]}>
              <View style={styles.menuRowLeft}>
                <View style={styles.iconContainerDefault}>
                  <Smartphone size={18} color="#1C1B1B" />
                </View>
                <View>
                  <Text style={styles.menuTitleText}>Perangkat Terdaftar</Text>
                  <Text style={styles.menuSubText}>
                    Apple iPhone 14 Pro (Terkunci)
                  </Text>
                </View>
              </View>
              <View style={styles.badgeConnected}>
                <Text style={styles.badgeConnectedText}>Terhubung</Text>
              </View>
            </View>
          </View>
        </View>

        {/* --- PRESENSI & NOTIFIKASI SECTION --- */}
        <View style={styles.sectionGroup}>
          <Text style={styles.groupHeaderTitle}>PRESENSI & NOTIFIKASI</Text>
          <View style={styles.menuGroupCard}>
            {/* Clock-in Reminder */}
            <View style={styles.menuRow}>
              <View style={styles.menuRowLeft}>
                <View style={styles.iconContainerDefault}>
                  <Bell size={18} color="#1C1B1B" />
                </View>
                <View>
                  <Text style={styles.menuTitleText}>Pengingat Presensi</Text>
                  <Text style={styles.menuSubText}>
                    Push notif 15 mnt sebelum shift
                  </Text>
                </View>
              </View>
              <Switch
                value={isReminderEnabled}
                onValueChange={setIsReminderEnabled}
                trackColor={{ false: "#EAE7E7", true: "#1E5631" }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Language Selector */}
            <TouchableOpacity
              style={[styles.menuRow, { borderBottomWidth: 0 }]}
              activeOpacity={0.7}
            >
              <View style={styles.menuRowLeft}>
                <View style={styles.iconContainerDefault}>
                  <Languages size={18} color="#1C1B1B" />
                </View>
                <View>
                  <Text style={styles.menuTitleText}>Bahasa Aplikasi</Text>
                  <Text style={styles.menuSubText}>Bahasa Indonesia</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#717970" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- BANTUAN & LEGAL SECTION --- */}
        <View style={styles.sectionGroup}>
          <Text style={styles.groupHeaderTitle}>BANTUAN & LEGAL</Text>
          <View style={styles.menuGroupCard}>
            {/* SOP Handbook */}
            <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
              <View style={styles.menuRowLeft}>
                <View style={styles.iconContainerDefault}>
                  <BookOpen size={18} color="#1C1B1B" />
                </View>
                <View>
                  <Text style={styles.menuTitleText}>Buku Panduan & SOP</Text>
                  <Text style={styles.menuSubText}>
                    Regulasi kehadiran & izin dinas
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color="#717970" />
            </TouchableOpacity>

            {/* Helpdesk Contact */}
            <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
              <View style={styles.menuRowLeft}>
                <View style={styles.iconContainerDefault}>
                  <Headphones size={18} color="#1C1B1B" />
                </View>
                <View>
                  <Text style={styles.menuTitleText}>
                    Hubungi HR & Helpdesk
                  </Text>
                  <Text style={styles.menuSubText}>
                    Tiket kendala presensi & lokasi
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color="#717970" />
            </TouchableOpacity>

            {/* Privacy Policy */}
            <TouchableOpacity
              style={[styles.menuRow, { borderBottomWidth: 0 }]}
              activeOpacity={0.7}
            >
              <View style={styles.menuRowLeft}>
                <View style={styles.iconContainerDefault}>
                  <ShieldCheck size={18} color="#1C1B1B" />
                </View>
                <View>
                  <Text style={styles.menuTitleText}>
                    Syarat & Kebijakan Privasi
                  </Text>
                  <Text style={styles.menuSubText}>
                    Perlindungan data biometrik
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color="#717970" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- LOGOUT & FOOTER INFO --- */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <LogOut size={20} color="#BA1A1A" />
            <Text style={styles.logoutBtnText}>Keluar Akun</Text>
          </TouchableOpacity>

          <View style={styles.versionFooter}>
            <Text style={styles.versionText}>Versi 3.4.1 (Build 142)</Text>
            <Text style={styles.companyText}>PT Solusi Digital Nusantara</Text>
          </View>
        </View>
      </ScrollView>

      {/* --- BOTTOM NAVBAR --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/home" as any)}
        >
          <HomeIcon size={20} color="#717970" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/history" as any)}
        >
          <HistoryIcon size={20} color="#717970" />
          <Text style={styles.navText}>Riwayat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/leave" as any)}
        >
          <FileText size={20} color="#717970" />
          <Text style={styles.navText}>Cuti</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemActive}>
          <User size={20} color="#003E1C" />
          <Text style={styles.navTextActive}>Profil</Text>
          <View style={styles.activeNavDot} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F8",
  },
  header: {
    height: 56,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(192,201,190,0.4)",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1B1B",
    letterSpacing: -0.2,
  },
  iconHeaderBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 90,
    gap: 16,
  },

  /* HERO CARD */
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.6)",
    position: "relative",
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  topAccentRibbon: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: "#1E5631",
  },
  heroMainRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    paddingTop: 4,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(0,62,28,0.1)",
    backgroundColor: "#F0EDED",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  cameraBtn: {
    position: "absolute",
    bottom: -6,
    right: -6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1E5631",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    elevation: 2,
  },
  heroDetails: {
    flex: 1,
  },
  employmentChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(160,245,121,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(160,245,121,0.5)",
    gap: 6,
    marginBottom: 6,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#256D00",
  },
  employmentChipText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#1E5631",
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1B1B",
  },
  userRole: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E5631",
    marginTop: 2,
  },
  userDept: {
    fontSize: 12,
    color: "#414941",
    marginTop: 1,
  },
  metadataContainer: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(192,201,190,0.5)",
    flexDirection: "row",
    gap: 12,
  },
  metadataItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metadataText: {
    fontSize: 12,
    color: "#1C1B1B",
    fontWeight: "600",
    flex: 1,
  },
  editProfileBtn: {
    marginTop: 14,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C0C9BE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
  },
  editProfileBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1B1B",
  },

  /* BENTO METRIC BAR */
  metricsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.6)",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#717970",
    letterSpacing: 0.5,
  },
  metricMainValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C1B1B",
    marginVertical: 4,
  },
  textPrimary: { color: "#1E5631" },
  textSecondary: { color: "#256D00" },
  metricSubText: {
    fontSize: 10,
    color: "#414941",
  },
  textSecondaryBold: {
    color: "#256D00",
    fontWeight: "700",
  },

  /* PLACEMENT CARD */
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.6)",
    flexDirection: "row",
    overflow: "hidden",
    elevation: 1,
  },
  accentLeftBar: {
    width: 4,
    backgroundColor: "#1E5631",
  },
  cardContent: {
    flex: 1,
    padding: 14,
    gap: 12,
  },
  cardSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitleCluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardTitleText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1C1B1B",
  },
  statusActiveBadge: {
    backgroundColor: "rgba(181,241,191,0.3)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#B5F1BF",
  },
  statusActiveBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#1E5631",
  },
  placementList: {
    gap: 10,
  },
  placementItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  itemMetaLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#717970",
  },
  itemMetaVal: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1C1B1B",
    marginTop: 1,
  },
  telemetryBox: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(192,201,190,0.4)",
    backgroundColor: "#F6F3F2",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  telemetryLeftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  telemetryTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#1C1B1B",
  },
  telemetrySub: {
    fontSize: 11,
    color: "#1E5631",
    fontWeight: "600",
  },

  /* SECTION GROUP & MENU CARD */
  sectionGroup: {
    gap: 6,
  },
  groupHeaderTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#717970",
    paddingLeft: 4,
  },
  menuGroupCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.6)",
    overflow: "hidden",
  },
  menuRow: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(192,201,190,0.3)",
  },
  menuRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainerDefault: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F0EDED",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerGreen: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(160,245,121,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuTitleText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1B1B",
  },
  menuSubText: {
    fontSize: 11,
    color: "#717970",
    marginTop: 1,
  },
  badgeConnected: {
    backgroundColor: "rgba(181,241,191,0.4)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B5F1BF",
  },
  badgeConnectedText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#1E5631",
  },

  /* LOGOUT & FOOTER */
  logoutContainer: {
    paddingTop: 8,
    gap: 12,
  },
  logoutBtn: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(186,26,26,0.3)",
    backgroundColor: "rgba(255,218,214,0.3)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#BA1A1A",
  },
  versionFooter: {
    alignItems: "center",
    gap: 2,
  },
  versionText: {
    fontSize: 11,
    color: "#717970",
    fontWeight: "600",
  },
  companyText: {
    fontSize: 11,
    color: "#C0C9BE",
  },

  /* BOTTOM NAVBAR */
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "rgba(192,201,190,0.3)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  navItemActive: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: "700",
    color: "#003E1C",
    marginTop: 2,
  },
  activeNavDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#003E1C",
    position: "absolute",
    bottom: -6,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#717970",
    marginTop: 2,
  },
});
