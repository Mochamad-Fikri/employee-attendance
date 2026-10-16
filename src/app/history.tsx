import { useRouter } from "expo-router";
import {
  Bell,
  Building2,
  CalendarDays,
  Calendar as CalendarIcon,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileDown,
  FileText,
  History as HistoryIcon,
  Home as HomeIcon,
  Info,
  ListFilter,
  User,
} from "lucide-react-native";
import { useState } from "react";
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

export default function HistoryScreen() {
  const router = useRouter();

  // Mode Tampilan: 'list' | 'calendar'
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCF9F8" />

      {/* --- TOP NAVIGATION BAR / HEADER --- */}
      <View style={styles.header}>
        <View style={styles.userCluster}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtq485nFrIHz3FOkwg7irL7dRSCkpe6l4gqv_8R7KbDjT13oSzj73vnEsqXM3UK_ZDMPRjG9348wgdmCCpZq8Bi5OfVCRAyW4_Ljtn_5SJ_8C5chSpKRJK04fqIQmZwgyy3vVjmsTyuSKDVZ4AXABvSPVAQl54kJTFOwC6RJQh2K43z6pfErVMiXlQTK7FFMzcpvv8Zk6XjLIEmRgByQGtc6BoXLtsIipGzbPuQsdKfWrlanXgvZ_U",
              }}
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.headerTitle}>Riwayat Presensi</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconHeaderBtn}>
            <Download size={20} color="#414941" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconHeaderBtn}>
            <Bell size={20} color="#414941" />
            <View style={styles.unreadBadge} />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- MAIN CONTENT CANVAS --- */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Month & Year Selector Bar */}
        <View style={styles.monthSelectorCard}>
          <TouchableOpacity style={styles.chevronBtn}>
            <ChevronLeft size={20} color="#414941" />
          </TouchableOpacity>

          <View style={styles.monthTitleRow}>
            <CalendarIcon size={18} color="#003E1C" />
            <Text style={styles.monthTitleText}>Oktober 2026</Text>
            <ChevronDown size={16} color="#717970" />
          </View>

          <TouchableOpacity style={styles.chevronBtn}>
            <ChevronRight size={20} color="#414941" />
          </TouchableOpacity>
        </View>

        {/* 2. View Toggle Segmented Control */}
        <View style={styles.segmentedContainer}>
          <TouchableOpacity
            style={[
              styles.segmentBtn,
              viewMode === "calendar" && styles.segmentBtnActive,
            ]}
            onPress={() => setViewMode("calendar")}
          >
            <CalendarDays
              size={16}
              color={viewMode === "calendar" ? "#003E1C" : "#414941"}
            />
            <Text
              style={[
                styles.segmentText,
                viewMode === "calendar" && styles.segmentTextActive,
              ]}
            >
              Tampilan Kalender
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentBtn,
              viewMode === "list" && styles.segmentBtnActive,
            ]}
            onPress={() => setViewMode("list")}
          >
            <ListFilter
              size={16}
              color={viewMode === "list" ? "#003E1C" : "#414941"}
            />
            <Text
              style={[
                styles.segmentText,
                viewMode === "list" && styles.segmentTextActive,
              ]}
            >
              Tampilan Daftar
            </Text>
          </TouchableOpacity>
        </View>

        {/* 3. Monthly Attendance Summary Metrics Pills */}
        <View style={styles.metricsGrid}>
          {/* Hadir */}
          <View style={styles.metricCard}>
            <View style={styles.metricLabelRow}>
              <View style={[styles.dot, styles.dotGreen]} />
              <Text style={styles.metricLabel}>Hadir</Text>
            </View>
            <Text style={[styles.metricValue, styles.textGreen]}>20</Text>
            <Text style={styles.metricUnit}>Hari</Text>
          </View>

          {/* Terlambat */}
          <View style={styles.metricCard}>
            <View style={styles.metricLabelRow}>
              <View style={[styles.dot, styles.dotRed]} />
              <Text style={styles.metricLabel}>Terlambat</Text>
            </View>
            <Text style={[styles.metricValue, styles.textRed]}>1</Text>
            <Text style={styles.metricUnit}>Hari</Text>
          </View>

          {/* Cuti */}
          <View style={styles.metricCard}>
            <View style={styles.metricLabelRow}>
              <View style={[styles.dot, styles.dotYellow]} />
              <Text style={styles.metricLabel}>Cuti</Text>
            </View>
            <Text style={[styles.metricValue, styles.textYellow]}>2</Text>
            <Text style={styles.metricUnit}>Hari</Text>
          </View>

          {/* Sakit */}
          <View style={styles.metricCard}>
            <View style={styles.metricLabelRow}>
              <View style={[styles.dot, styles.dotGray]} />
              <Text style={styles.metricLabel}>Sakit</Text>
            </View>
            <Text style={[styles.metricValue, styles.textGray]}>0</Text>
            <Text style={styles.metricUnit}>Hari</Text>
          </View>
        </View>

        {/* Section Title & Filter Indicator */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Log Kehadiran Harian</Text>
          <Text style={styles.sectionCounter}>23 Catatan Terdata</Text>
        </View>

        {/* 4. Itemized History Cards List */}
        <View style={styles.historyList}>
          {/* Card 1: Hadir Tepat Waktu (Jumat) */}
          <View style={[styles.logCard, styles.borderLeftGreen]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardDate}>Jumat, 24 Okt 2026</Text>
                <Text style={styles.cardSub}>
                  Jam Kerja Reguler (08:00 - 17:00)
                </Text>
              </View>
              <View style={styles.chipGreen}>
                <View style={[styles.dotSmall, styles.dotGreen]} />
                <Text style={styles.chipGreenText}>Hadir Tepat Waktu</Text>
              </View>
            </View>

            <View style={styles.gridDetails}>
              <View>
                <Text style={styles.detailLabel}>MASUK</Text>
                <Text style={styles.detailValGreen}>08:15 WIB</Text>
              </View>
              <View>
                <Text style={styles.detailLabel}>KELUAR</Text>
                <Text style={styles.detailValDark}>17:30 WIB</Text>
              </View>
              <View>
                <Text style={styles.detailLabel}>DURASI</Text>
                <Text style={styles.detailValMuted}>8j 15m</Text>
              </View>
            </View>

            <View style={styles.telemetryRow}>
              <View style={styles.telemetryLeft}>
                <Building2 size={15} color="#256D00" />
                <Text style={styles.telemetryText}>
                  WFO Kantor Pusat (Lt. 4)
                </Text>
              </View>
              <View style={styles.telemetryRight}>
                <CheckCircle2 size={13} color="#256D00" />
                <Text style={styles.telemetryStatusGreen}>
                  GPS Terverifikasi
                </Text>
              </View>
            </View>
          </View>

          {/* Card 2: Terlambat (Kamis) */}
          <View style={[styles.logCard, styles.borderLeftRed]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardDate}>Kamis, 23 Okt 2026</Text>
                <Text style={styles.cardSub}>
                  Jam Kerja Reguler (08:00 - 17:00)
                </Text>
              </View>
              <View style={styles.chipRed}>
                <View style={[styles.dotSmall, styles.dotRed]} />
                <Text style={styles.chipRedText}>Terlambat 12m</Text>
              </View>
            </View>

            <View style={styles.gridDetails}>
              <View>
                <Text style={styles.detailLabel}>MASUK</Text>
                <Text style={styles.detailValRed}>08:42 WIB</Text>
              </View>
              <View>
                <Text style={styles.detailLabel}>KELUAR</Text>
                <Text style={styles.detailValDark}>17:45 WIB</Text>
              </View>
              <View>
                <Text style={styles.detailLabel}>DURASI</Text>
                <Text style={styles.detailValMuted}>8j 03m</Text>
              </View>
            </View>

            <View style={styles.notesBox}>
              <Info size={14} color="#717970" style={{ marginTop: 2 }} />
              <Text style={styles.notesText}>
                <Text style={{ fontWeight: "700", color: "#1C1B1B" }}>
                  Catatan:{" "}
                </Text>
                Kendala lalu lintas padat jalan arteri barat.
              </Text>
            </View>
          </View>

          {/* Card 3: Cuti Disetujui (Rabu) */}
          <View style={[styles.logCard, styles.borderLeftYellow]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardDate}>Rabu, 22 Okt 2026</Text>
                <Text style={styles.cardSub}>Pengajuan Izin Tidak Masuk</Text>
              </View>
              <View style={styles.chipYellow}>
                <View style={[styles.dotSmall, styles.dotYellow]} />
                <Text style={styles.chipYellowText}>Cuti Disetujui</Text>
              </View>
            </View>

            <View style={styles.leaveBanner}>
              <View style={styles.leaveIconBox}>
                <CalendarDays size={18} color="#5B4300" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.leaveTitle}>Cuti Tahunan</Text>
                <Text style={styles.leaveSub}>
                  Disetujui oleh: Bambang S. (HR Manager)
                </Text>
              </View>
            </View>
          </View>

          {/* Card 4: WFH (Selasa) */}
          <View style={[styles.logCard, styles.borderLeftGreen]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardDate}>Selasa, 21 Okt 2026</Text>
                <Text style={styles.cardSub}>Jam Kerja Fleksibel (WFH)</Text>
              </View>
              <View style={styles.chipGreen}>
                <View style={[styles.dotSmall, styles.dotGreen]} />
                <Text style={styles.chipGreenText}>Hadir Tepat Waktu</Text>
              </View>
            </View>

            <View style={styles.gridDetails}>
              <View>
                <Text style={styles.detailLabel}>MASUK</Text>
                <Text style={styles.detailValGreen}>08:05 WIB</Text>
              </View>
              <View>
                <Text style={styles.detailLabel}>KELUAR</Text>
                <Text style={styles.detailValDark}>17:15 WIB</Text>
              </View>
              <View>
                <Text style={styles.detailLabel}>DURASI</Text>
                <Text style={styles.detailValMuted}>8j 10m</Text>
              </View>
            </View>

            <View style={styles.telemetryRow}>
              <View style={styles.telemetryLeft}>
                <HomeIcon size={15} color="#003E1C" />
                <Text style={styles.telemetryText}>
                  Remote / WFH (Dukuh Pakis)
                </Text>
              </View>
              <View style={styles.telemetryRight}>
                <CheckCircle2 size={13} color="#256D00" />
                <Text style={styles.telemetryStatusGreen}>
                  Selfie + GPS Valid
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 5. Quick Export CTA Banner */}
        <View style={styles.exportCard}>
          <View>
            <Text style={styles.exportSub}>Kompensasi Lembur Terkumpul</Text>
            <Text style={styles.exportTitle}>12 Jam 45 Menit</Text>
          </View>
          <TouchableOpacity style={styles.exportBtn} activeOpacity={0.8}>
            <FileDown size={16} color="#FFFFFF" />
            <Text style={styles.exportBtnText}>Unduh PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* --- BOTTOM NAVBAR --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/home")}
        >
          <HomeIcon size={20} color="#717970" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemActive}>
          <HistoryIcon size={20} color="#003E1C" />
          <Text style={styles.navTextActive}>Riwayat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/leave")}
        >
          <FileText size={20} color="#717970" />
          <Text style={styles.navText}>Cuti</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
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
    gap: 10,
  },
  avatarContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.4)",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#003E1C",
    letterSpacing: -0.3,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconHeaderBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  unreadBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#BA1A1A",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90,
    gap: 14,
  },

  /* MONTH SELECTOR */
  monthSelectorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.6)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  chevronBtn: {
    padding: 6,
    borderRadius: 8,
  },
  monthTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  monthTitleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C1B1B",
  },

  /* SEGMENTED CONTROL */
  segmentedContainer: {
    backgroundColor: "#F0EDED",
    borderRadius: 8,
    padding: 3,
    flexDirection: "row",
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  segmentBtnActive: {
    backgroundColor: "#FFFFFF",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  segmentText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#414941",
  },
  segmentTextActive: {
    color: "#003E1C",
    fontWeight: "700",
  },

  /* METRICS GRID */
  metricsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.5)",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  metricLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotGreen: { backgroundColor: "#256D00" },
  dotRed: { backgroundColor: "#BA1A1A" },
  dotYellow: { backgroundColor: "#FABD00" },
  dotGray: { backgroundColor: "#717970" },
  metricLabel: {
    fontSize: 10,
    color: "#414941",
    fontWeight: "600",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  textGreen: { color: "#003E1C" },
  textRed: { color: "#BA1A1A" },
  textYellow: { color: "#5B4300" },
  textGray: { color: "#717970" },
  metricUnit: {
    fontSize: 9,
    color: "#717970",
    fontWeight: "600",
  },

  /* SECTION HEADER */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C1B1B",
  },
  sectionCounter: {
    fontSize: 11,
    color: "#717970",
  },

  /* HISTORY CARDS */
  historyList: {
    gap: 12,
  },
  logCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.6)",
    gap: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  borderLeftGreen: { borderLeftWidth: 5, borderLeftColor: "#256D00" },
  borderLeftRed: { borderLeftWidth: 5, borderLeftColor: "#BA1A1A" },
  borderLeftYellow: { borderLeftWidth: 5, borderLeftColor: "#FABD00" },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardDate: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1C1B1B",
  },
  cardSub: {
    fontSize: 11,
    color: "#717970",
    marginTop: 1,
  },
  chipGreen: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(37,109,0,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 5,
  },
  chipGreenText: { fontSize: 10, fontWeight: "700", color: "#003E1C" },
  chipRed: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFDAD6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 5,
  },
  chipRedText: { fontSize: 10, fontWeight: "700", color: "#93000A" },
  chipYellow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFDF9E",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 5,
  },
  chipYellowText: { fontSize: 10, fontWeight: "700", color: "#5B4300" },
  dotSmall: { width: 5, height: 5, borderRadius: 2.5 },

  /* GRID DETAILS */
  gridDetails: {
    flexDirection: "row",
    backgroundColor: "#F6F3F2",
    borderRadius: 8,
    padding: 8,
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.3)",
  },
  detailLabel: {
    fontSize: 9,
    color: "#717970",
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  detailValGreen: { fontSize: 13, fontWeight: "700", color: "#003E1C" },
  detailValRed: { fontSize: 13, fontWeight: "700", color: "#BA1A1A" },
  detailValDark: { fontSize: 13, fontWeight: "700", color: "#1C1B1B" },
  detailValMuted: { fontSize: 13, fontWeight: "600", color: "#414941" },

  /* TELEMETRY */
  telemetryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  telemetryLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  telemetryText: {
    fontSize: 11,
    color: "#414941",
  },
  telemetryRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  telemetryStatusGreen: {
    fontSize: 10,
    fontWeight: "700",
    color: "#256D00",
  },
  notesBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(229,226,225,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  notesText: {
    fontSize: 11,
    color: "#414941",
    flex: 1,
    lineHeight: 15,
  },
  leaveBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F3F2",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.3)",
    gap: 10,
  },
  leaveIconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#EAE7E7",
    justifyContent: "center",
    alignItems: "center",
  },
  leaveTitle: { fontSize: 13, fontWeight: "700", color: "#1C1B1B" },
  leaveSub: { fontSize: 11, color: "#717970", marginTop: 1 },

  /* EXPORT CARD */
  exportCard: {
    backgroundColor: "#003E1C",
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  exportSub: {
    fontSize: 11,
    color: "#B5F1BF",
    fontWeight: "600",
  },
  exportTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 2,
  },
  exportBtn: {
    backgroundColor: "#1E5631",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  exportBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
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
