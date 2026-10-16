import { useRouter } from "expo-router";
import {
  Bell,
  Calendar,
  CalendarCheck,
  Check,
  CheckCircle2,
  FileText,
  Fingerprint,
  History,
  Home as HomeIcon,
  LogOut,
  MapPin,
  Timer,
  User,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  // Realtime Clock State
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Format Jam (HH:mm:ss)
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);

      // Format Tanggal (Senin, 24 Okt 2026)
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      setCurrentDate(now.toLocaleDateString("id-ID", options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    // Berpindah ke layar verifikasi presensi (Face & GPS)
    router.push("/verify");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCF9F8" />

      {/* --- TOP APP BAR / HEADER --- */}
      <View style={styles.header}>
        <View style={styles.userCluster}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUUKENo2ohx_mEAseYPasSxg_5nW4ZM4fFwF-uGyCf6Rexerb7or0fE15CZbBR9yHRYquo5qnDZxMVcir9eIRnt3CljdVCAw3wWklasARMN_5mdF02uGq3zhtJjm5D71fuqTeK8q8UlLCoZ12HwiscB4RSfmGvMORPrEwsYhx_f2dsf2zMGeul0UgpQJsD6SqbkCNXgbaeqPwL9n4r6ozjjKtuVGMtUEmwmygaQ8uujsp6pUCoQ_3U",
              }}
              style={styles.avatarImage}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>David Ginola</Text>
            <Text style={styles.userRole}>Software Engineer - Tech Div</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={20} color="#1C1B1B" />
          <View style={styles.unreadBadge} />
        </TouchableOpacity>
      </View>

      {/* --- MAIN CONTENT CANVAS --- */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Real-time Clock Widget */}
        <View style={styles.clockCard}>
          <View style={styles.dateRow}>
            <Calendar size={14} color="#414941" />
            <Text style={styles.dateText}>
              {currentDate || "Senin, 24 Okt 2026"}
            </Text>
          </View>

          <View style={styles.timeRow}>
            <Text style={styles.clockText}>{currentTime || "08:24:15"}</Text>
            <Text style={styles.timeZoneText}>WIB</Text>
          </View>

          <Text style={styles.shiftText}>
            Jadwal Shift: Pagi (08:00 - 17:00 WIB)
          </Text>
        </View>

        {/* 2. Attendance Hero Widget */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroTitle}>Status Presensi Hari Ini</Text>
            <View style={styles.statusChip}>
              <View style={styles.pulseDot} />
              <Text style={styles.statusChipText}>Tercatat Hadir</Text>
            </View>
          </View>

          {/* Jam Masuk & Keluar Grid */}
          <View style={styles.timeGrid}>
            <View style={[styles.timeCard, styles.timeCardIn]}>
              <Text style={styles.timeLabel}>Jam Masuk</Text>
              <View style={styles.timeValueRow}>
                <Text style={styles.timeValueIn}>
                  08:15 <Text style={styles.timeUnit}>WIB</Text>
                </Text>
                <View style={styles.tagGreen}>
                  <Text style={styles.tagGreenText}>Tepat Waktu</Text>
                </View>
              </View>
            </View>

            <View style={[styles.timeCard, styles.timeCardOut]}>
              <Text style={styles.timeLabel}>Jam Keluar</Text>
              <View style={styles.timeValueRow}>
                <Text style={styles.timeValueOut}>
                  --:-- <Text style={styles.timeUnit}>WIB</Text>
                </Text>
                <View style={styles.tagGray}>
                  <Text style={styles.tagGrayText}>Belum Absen</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Location / Geofence Info */}
          <View style={styles.locationBox}>
            <View style={styles.locationIconCircle}>
              <MapPin size={16} color="#256D00" />
            </View>
            <View style={styles.locationInfo}>
              <View style={styles.locationHeader}>
                <Text style={styles.locationTitle}>Dalam Radius Kantor</Text>
                <Text style={styles.locationAccuracy}>Akurat (± 3m)</Text>
              </View>
              <Text style={styles.locationSubtitle}>
                Head Office BSD Green Building • Jarak: 45m
              </Text>
            </View>
          </View>

          {/* Triggers Action */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.clockInBtn}
              activeOpacity={0.8}
              onPress={handleClockIn}
            >
              <Fingerprint size={20} color="#FFFFFF" />
              <Text style={styles.clockInBtnText}>Clock-In Kehadiran</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clockOutBtn} activeOpacity={0.8}>
              <LogOut size={16} color="#BA1A1A" />
              <Text style={styles.clockOutBtnText}>
                Clock-Out (Selesai Bekerja)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Quick Stats (Bento Grid) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ringkasan Bulan Ini</Text>
            <Text style={styles.sectionSubText}>Oktober 2026</Text>
          </View>

          <View style={styles.bentoGrid}>
            <View style={styles.bentoCard}>
              <View style={styles.bentoCardHeader}>
                <Text style={styles.bentoLabel}>Sisa Cuti</Text>
                <View style={styles.bentoIconBox}>
                  <CalendarCheck size={18} color="#003E1C" />
                </View>
              </View>
              <View style={styles.bentoValueRow}>
                <Text style={styles.bentoValue}>12</Text>
                <Text style={styles.bentoUnit}>Hari</Text>
              </View>
              <Text style={styles.bentoSub}>Tersedia untuk tahun ini</Text>
            </View>

            <View style={styles.bentoCard}>
              <View style={styles.bentoCardHeader}>
                <Text style={styles.bentoLabel}>Jam Kerja</Text>
                <View style={styles.bentoIconBox}>
                  <Timer size={18} color="#003E1C" />
                </View>
              </View>
              <View style={styles.bentoValueRow}>
                <Text style={styles.bentoValue}>168.5</Text>
                <Text style={styles.bentoUnit}>Jam</Text>
              </View>
              <View style={styles.bentoBadgeGreen}>
                <CheckCircle2 size={12} color="#256D00" />
                <Text style={styles.bentoBadgeGreenText}>Target 160 Jam</Text>
              </View>
            </View>

            <View style={[styles.bentoCard, styles.bentoFullSpan]}>
              <View style={styles.bentoFullLeft}>
                <Text style={styles.bentoLabel}>
                  Tingkat Kehadiran Disiplin
                </Text>
                <View style={styles.bentoFullValueRow}>
                  <Text style={styles.bentoFullValue}>98%</Text>
                  <Text style={styles.bentoTagGreenText}>Tepat Waktu</Text>
                </View>
                <Text style={styles.bentoSub}>
                  19 Hadir • 1 Izin Sakit • 0 Terlambat
                </Text>
              </View>

              <View style={styles.radialMiniBadge}>
                <CheckCircle2 size={24} color="#256D00" />
              </View>
            </View>
          </View>
        </View>

        {/* 4. Recent Logs / Aktivitas Terkini */}
        <View style={[styles.sectionContainer, styles.recentLogsSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Aktivitas Terkini</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllBtn}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.logsList}>
            <View style={styles.logCard}>
              <View style={styles.logLeft}>
                <View style={styles.logIconBox}>
                  <Check size={18} color="#414941" />
                </View>
                <View>
                  <Text style={styles.logDate}>Jumat, 21 Okt 2026</Text>
                  <Text style={styles.logTimes}>
                    Masuk: 07:58 WIB • Keluar: 17:05 WIB
                  </Text>
                </View>
              </View>
              <View style={styles.tagGreen}>
                <Text style={styles.tagGreenText}>Lengkap</Text>
              </View>
            </View>

            <View style={styles.logCard}>
              <View style={styles.logLeft}>
                <View style={styles.logIconBox}>
                  <Check size={18} color="#414941" />
                </View>
                <View>
                  <Text style={styles.logDate}>Kamis, 20 Okt 2026</Text>
                  <Text style={styles.logTimes}>
                    Masuk: 08:02 WIB • Keluar: 17:12 WIB
                  </Text>
                </View>
              </View>
              <View style={styles.tagGreen}>
                <Text style={styles.tagGreenText}>Lengkap</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* --- BOTTOM NAVBAR --- */}
      <View style={styles.bottomNav}>
        {/* Destination 1: Home (ACTIVE) */}
        <TouchableOpacity style={styles.navItemActive}>
          <HomeIcon size={20} color="#003E1C" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>

        {/* Destination 2: Riwayat (Redirect ke history.tsx) */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/history")}
        >
          <History size={20} color="#717970" />
          <Text style={styles.navText}>Riwayat</Text>
        </TouchableOpacity>

        {/* Destination 3: Cuti */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/leave")}
        >
          <FileText size={20} color="#717970" />
          <Text style={styles.navText}>Cuti</Text>
        </TouchableOpacity>

        {/* Destination 4: Profil */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/profile")}
        >
          <User size={20} color="#717970" />
          <Text style={styles.navText}>Profil</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#C0C9BE",
  },
  userCluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.4)",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C1B1B",
  },
  userRole: {
    fontSize: 12,
    color: "#414941",
    marginTop: 1,
  },
  notificationButton: {
    padding: 8,
    borderRadius: 8,
    position: "relative",
  },
  unreadBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#BA1A1A",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
    gap: 16,
  },

  /* CLOCK CARD */
  clockCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.4)",
    alignItems: "center",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#414941",
    fontWeight: "600",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  clockText: {
    fontSize: 38,
    fontWeight: "700",
    color: "#003E1C",
    letterSpacing: -1,
  },
  timeZoneText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E5631",
  },
  shiftText: {
    fontSize: 12,
    color: "#717970",
    marginTop: 4,
  },

  /* HERO CARD */
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.4)",
    gap: 12,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C1B1B",
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(160,245,121,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(37,109,0,0.2)",
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#256D00",
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#256D00",
  },
  timeGrid: {
    flexDirection: "row",
    gap: 8,
  },
  timeCard: {
    flex: 1,
    backgroundColor: "#F6F3F2",
    borderRadius: 8,
    padding: 10,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(192,201,190,0.3)",
  },
  timeCardIn: {
    borderLeftWidth: 4,
    borderLeftColor: "#1E5631",
  },
  timeCardOut: {
    borderLeftWidth: 4,
    borderLeftColor: "#C0C9BE",
  },
  timeLabel: {
    fontSize: 12,
    color: "#414941",
    fontWeight: "600",
  },
  timeValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 4,
  },
  timeValueIn: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E5631",
  },
  timeValueOut: {
    fontSize: 16,
    fontWeight: "700",
    color: "#717970",
  },
  timeUnit: {
    fontSize: 11,
    fontWeight: "400",
  },
  tagGreen: {
    backgroundColor: "rgba(163,248,124,0.5)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagGreenText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#256D00",
  },
  tagGray: {
    backgroundColor: "#EAE7E7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagGrayText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#717970",
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(246,243,242,0.7)",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.4)",
    gap: 10,
  },
  locationIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#A3F87C",
    justifyContent: "center",
    alignItems: "center",
  },
  locationInfo: {
    flex: 1,
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1C1B1B",
  },
  locationAccuracy: {
    fontSize: 10,
    fontWeight: "700",
    color: "#256D00",
  },
  locationSubtitle: {
    fontSize: 11,
    color: "#414941",
    marginTop: 2,
  },
  actionContainer: {
    gap: 8,
    marginTop: 4,
  },
  clockInBtn: {
    height: 52,
    backgroundColor: "#1E5631",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  clockInBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  clockOutBtn: {
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(186,26,26,0.3)",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  clockOutBtnText: {
    color: "#BA1A1A",
    fontSize: 12,
    fontWeight: "600",
  },

  /* SECTION & BENTO GRID */
  sectionContainer: {
    gap: 8,
    marginBottom: 4,
  },
  recentLogsSection: {
    marginTop: 90,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C1B1B",
  },
  sectionSubText: {
    fontSize: 10,
    color: "#414941",
  },
  seeAllBtn: {
    fontSize: 12,
    color: "#003E1C",
    fontWeight: "600",
  },
  bentoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  bentoCard: {
    flex: 1,
    minWidth: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.4)",
    justifyContent: "space-between",
  },
  bentoCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  bentoLabel: {
    fontSize: 12,
    color: "#414941",
    fontWeight: "600",
  },
  bentoIconBox: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: "#EAE7E7",
  },
  bentoValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  bentoValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1C1B1B",
  },
  bentoUnit: {
    fontSize: 12,
    color: "#414941",
    fontWeight: "500",
  },
  bentoSub: {
    fontSize: 10,
    color: "#717970",
    marginTop: 4,
  },
  bentoBadgeGreen: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  bentoBadgeGreenText: {
    fontSize: 10,
    color: "#256D00",
    fontWeight: "600",
  },
  bentoFullSpan: {
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  bentoFullLeft: {
    flex: 1,
  },
  bentoFullValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginVertical: 2,
  },
  bentoFullValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#003E1C",
  },
  bentoTagGreenText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#256D00",
  },
  radialMiniBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: "#A0F579",
    backgroundColor: "#F6F3F2",
    justifyContent: "center",
    alignItems: "center",
  },

  /* LOGS LIST */
  logsList: {
    gap: 8,
  },
  logCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(192,201,190,0.4)",
    borderLeftWidth: 4,
    borderLeftColor: "#1E5631",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#EAE7E7",
    justifyContent: "center",
    alignItems: "center",
  },
  logDate: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1B1B",
  },
  logTimes: {
    fontSize: 11,
    color: "#414941",
    marginTop: 2,
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
    borderTopColor: "#C0C9BE",
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
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: "700",
    color: "#003E1C",
    marginTop: 2,
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
