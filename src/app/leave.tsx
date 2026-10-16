import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  CalendarX,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  History as HistoryIcon,
  Home as HomeIcon,
  Info,
  MoreHorizontal,
  Palmtree,
  Paperclip,
  Plus,
  Search,
  Send,
  ShieldAlert,
  Timer,
  UploadCloud,
  User,
  UserSearch,
} from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LeaveScreen() {
  const router = useRouter();

  // Mode Tampilan: 'list' | 'form'
  const [activeTab, setActiveTab] = useState<"list" | "form">("list");

  // Form State
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("2026-11-04");
  const [endDate, setEndDate] = useState("2026-11-05");
  const [reason, setReason] = useState("");
  const [delegate, setDelegate] = useState("");

  const handleSubmit = () => {
    Alert.alert(
      "Pengajuan Berhasil",
      "Pengajuan Anda telah berhasil dikirimkan untuk diverifikasi!",
      [
        {
          text: "OK",
          onPress: () => setActiveTab("list"),
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
          <Text style={styles.headerTitle}>Cuti & Perizinan</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconHeaderBtn}>
            <Search size={20} color="#414941" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconHeaderBtn}>
            <Filter size={20} color="#414941" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- TAB SWITCHER SEGMENTED CONTROL --- */}
        <View style={styles.segmentedContainer}>
          <TouchableOpacity
            style={[
              styles.segmentBtn,
              activeTab === "list" && styles.segmentBtnActive,
            ]}
            onPress={() => setActiveTab("list")}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === "list" && styles.segmentTextActive,
              ]}
            >
              Daftar Pengajuan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentBtn,
              activeTab === "form" && styles.segmentBtnActive,
            ]}
            onPress={() => setActiveTab("form")}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === "form" && styles.segmentTextActive,
              ]}
            >
              Buat Pengajuan Baru
            </Text>
          </TouchableOpacity>
        </View>

        {/* --- BENTO LEAVE & OVERTIME BALANCES GRID --- */}
        <View style={styles.metricsGrid}>
          {/* Card 1: Sisa Cuti */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Sisa Cuti</Text>
              <Palmtree size={18} color="#003E1C" />
            </View>
            <View style={styles.balanceValueRow}>
              <Text style={[styles.balanceValue, styles.textPrimary]}>12</Text>
              <Text style={styles.balanceUnit}>Hari</Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: "75%" }]} />
            </View>
          </View>

          {/* Card 2: Terpakai */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Terpakai</Text>
              <CalendarX size={18} color="#717970" />
            </View>
            <View style={styles.balanceValueRow}>
              <Text style={[styles.balanceValue, styles.textDark]}>4</Text>
              <Text style={styles.balanceUnit}>Hari</Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: "25%", backgroundColor: "#256D00" },
                ]}
              />
            </View>
          </View>

          {/* Card 3: Kuota Lembur */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Lembur</Text>
              <MoreHorizontal size={18} color="#256D00" />
            </View>
            <View style={styles.balanceValueRow}>
              <Text style={[styles.balanceValue, styles.textSecondary]}>
                24
              </Text>
              <Text style={styles.balanceUnit}>Jam</Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: "66%", backgroundColor: "#88DB63" },
                ]}
              />
            </View>
          </View>
        </View>

        {/* --- QUICK ACTION CTA BUTTON --- */}
        {activeTab === "list" && (
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => setActiveTab("form")}
            activeOpacity={0.9}
          >
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.ctaButtonText}>Buat Pengajuan Baru</Text>
          </TouchableOpacity>
        )}

        {/* --- CONTENT VIEW 1: ACTIVE REQUEST LIST --- */}
        {activeTab === "list" ? (
          <View style={styles.listSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Riwayat Pengajuan Terbaru</Text>
              <Text style={styles.sectionSub}>Bulan Ini</Text>
            </View>

            {/* Request 1: Cuti Tahunan (Pending) */}
            <View style={[styles.requestCard, styles.borderLeftYellow]}>
              <View style={styles.cardMain}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleCluster}>
                    <View style={styles.titleRow}>
                      <Text style={styles.cardTitle}>Cuti Tahunan</Text>
                      <View style={styles.tagCategory}>
                        <Text style={styles.tagCategoryText}>Tahunan</Text>
                      </View>
                    </View>
                    <Text style={styles.cardSub}>
                      Libur Akhir Tahun bersama keluarga
                    </Text>
                  </View>

                  <View style={styles.chipYellow}>
                    <View style={[styles.dotSmall, styles.dotYellow]} />
                    <Text style={styles.chipYellowText}>Menunggu</Text>
                  </View>
                </View>

                <View style={styles.scheduleRow}>
                  <View style={styles.scheduleLeft}>
                    <CalendarIcon size={16} color="#717970" />
                    <Text style={styles.scheduleDateText}>
                      28 Des - 30 Des 2026
                    </Text>
                  </View>
                  <View style={styles.badgeDurationPrimary}>
                    <Text style={styles.badgeDurationPrimaryText}>3 Hari</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.telemetryLeft}>
                    <Clock size={15} color="#FABD00" />
                    <Text style={styles.telemetryText}>
                      Menunggu Manajer HR
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.detailBtn}>
                    <Text style={styles.detailBtnText}>Detail</Text>
                    <ChevronRight size={15} color="#003E1C" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Request 2: Izin Sakit (Approved) */}
            <View style={[styles.requestCard, styles.borderLeftGreen]}>
              <View style={styles.cardMain}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleCluster}>
                    <View style={styles.titleRow}>
                      <Text style={styles.cardTitle}>Izin Sakit</Text>
                      <View style={styles.tagCategory}>
                        <Text style={styles.tagCategoryText}>Medis</Text>
                      </View>
                    </View>
                    <Text style={styles.cardSub}>
                      Flu & Demam Tinggi (Surat Dokter Terlampir)
                    </Text>
                  </View>

                  <View style={styles.chipGreen}>
                    <View style={[styles.dotSmall, styles.dotGreen]} />
                    <Text style={styles.chipGreenText}>Disetujui</Text>
                  </View>
                </View>

                <View style={styles.scheduleRow}>
                  <View style={styles.scheduleLeft}>
                    <CalendarIcon size={16} color="#717970" />
                    <Text style={styles.scheduleDateText}>14 Okt 2026</Text>
                  </View>
                  <View style={styles.badgeDurationSecondary}>
                    <Text style={styles.badgeDurationSecondaryText}>
                      1 Hari
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.telemetryLeft}>
                    <CheckCircle2 size={15} color="#256D00" />
                    <Text style={styles.telemetryText}>
                      Disetujui oleh{" "}
                      <Text style={{ fontWeight: "700", color: "#1C1B1B" }}>
                        Bpk. Hendra Gunawan
                      </Text>
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.detailBtn}>
                    <Text style={styles.detailBtnText}>Lampiran</Text>
                    <Paperclip
                      size={14}
                      color="#003E1C"
                      style={{ marginLeft: 2 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Request 3: Lembur Pekerjaan (Approved) */}
            <View style={[styles.requestCard, styles.borderLeftGreen]}>
              <View style={styles.cardMain}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleCluster}>
                    <View style={styles.titleRow}>
                      <Text style={styles.cardTitle}>Lembur Pekerjaan</Text>
                      <View style={styles.tagCategory}>
                        <Text style={styles.tagCategoryText}>Operational</Text>
                      </View>
                    </View>
                    <Text style={styles.cardSub}>
                      Project Deployment ERP Enterprise v2.4
                    </Text>
                  </View>

                  <View style={styles.chipGreen}>
                    <View style={[styles.dotSmall, styles.dotGreen]} />
                    <Text style={styles.chipGreenText}>Disetujui</Text>
                  </View>
                </View>

                <View style={styles.scheduleRow}>
                  <View style={styles.scheduleLeft}>
                    <Timer size={16} color="#717970" />
                    <Text style={styles.scheduleDateText}>
                      10 Okt 2026 (18:00 - 21:00)
                    </Text>
                  </View>
                  <View style={styles.badgeDurationSecondary}>
                    <Text style={styles.badgeDurationSecondaryText}>3 Jam</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.telemetryLeft}>
                    <CheckCircle2 size={15} color="#256D00" />
                    <Text style={styles.telemetryText}>
                      Tercatat di Payroll
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.detailBtn}>
                    <Text style={styles.detailBtnText}>Detail</Text>
                    <ChevronRight size={15} color="#003E1C" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : (
          /* --- CONTENT VIEW 2: FORM PENGAJUAN BARU --- */
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Formulir Pengajuan Baru</Text>
              <Text style={styles.formSub}>
                Lengkapi data di bawah untuk diverifikasi oleh atasan & HRD.
              </Text>
            </View>

            {/* Tipe Cuti / Izin */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Tipe Pengajuan <Text style={styles.requiredMark}>*</Text>
              </Text>
              <View style={styles.selectWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Pilih kategori pengajuan... (Contoh: Cuti Tahunan)"
                  value={leaveType}
                  onChangeText={setLeaveType}
                  placeholderTextColor="#717970"
                />
                <ChevronDown
                  size={18}
                  color="#717970"
                  style={styles.selectIcon}
                />
              </View>
            </View>

            {/* Rentang Tanggal */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Rentang Tanggal / Waktu{" "}
                <Text style={styles.requiredMark}>*</Text>
              </Text>
              <View style={styles.dateRow}>
                <TextInput
                  style={[styles.textInput, styles.dateInput]}
                  value={startDate}
                  onChangeText={setStartDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#717970"
                />
                <TextInput
                  style={[styles.textInput, styles.dateInput]}
                  value={endDate}
                  onChangeText={setEndDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#717970"
                />
              </View>
              <View style={styles.dateHintRow}>
                <Info size={13} color="#414941" />
                <Text style={styles.dateHintText}>
                  Total durasi terhitung:{" "}
                  <Text style={{ fontWeight: "700" }}>2 Hari Kerja</Text>
                </Text>
              </View>
            </View>

            {/* Alasan Pengajuan */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Alasan Pengajuan <Text style={styles.requiredMark}>*</Text>
              </Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Jelaskan kebutuhan pengajuan cuti atau perizinan secara rinci..."
                placeholderTextColor="#717970"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={reason}
                onChangeText={setReason}
              />
            </View>

            {/* Lampiran Upload */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Lampiran Dokumen / Berkas Bukti
              </Text>
              <TouchableOpacity style={styles.uploadArea} activeOpacity={0.8}>
                <View style={styles.uploadIconCircle}>
                  <UploadCloud size={20} color="#003E1C" />
                </View>
                <Text style={styles.uploadTitle}>
                  Pilih Dokumen atau Tarik ke Sini
                </Text>
                <Text style={styles.uploadSub}>PDF, JPG, PNG (Maks. 5 MB)</Text>
              </TouchableOpacity>
            </View>

            {/* Delegasi Handover */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Rekan Kerja Delegasi (Handover Tugas)
              </Text>
              <View style={styles.inputWithIcon}>
                <UserSearch
                  size={18}
                  color="#717970"
                  style={styles.inputIconLeft}
                />
                <TextInput
                  style={[styles.textInput, { paddingLeft: 38 }]}
                  placeholder="Contoh: Dimas Prakoso (Frontend Dev)"
                  placeholderTextColor="#717970"
                  value={delegate}
                  onChangeText={setDelegate}
                />
              </View>
            </View>

            {/* Form Action Cluster */}
            <View style={styles.actionCluster}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleSubmit}
                activeOpacity={0.9}
              >
                <Send size={18} color="#FFFFFF" />
                <Text style={styles.submitBtnText}>
                  Kirimkan Pengajuan Sekarang
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setActiveTab("list")}
              >
                <Text style={styles.cancelBtnText}>Batalkan</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* --- INFORMATION NOTICE CARD --- */}
        <View style={styles.policyNoticeCard}>
          <ShieldAlert size={20} color="#003E1C" style={{ marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.policyTitle}>
              Ketentuan Perizinan Perusahaan
            </Text>
            <Text style={styles.policyBody}>
              Pengajuan cuti tahunan diajukan maksimal{" "}
              <Text style={{ fontWeight: "700" }}>H-3</Text> sebelum tanggal
              berlaku. Cuti sakit lebih dari 1 hari wajib menyertakan surat
              keterangan dokter resmi.
            </Text>
          </View>
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

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace("/history")}
        >
          <HistoryIcon size={20} color="#717970" />
          <Text style={styles.navText}>Riwayat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemActive}>
          <FileText size={20} color="#003E1C" />
          <Text style={styles.navTextActive}>Cuti</Text>
          <View style={styles.activeNavDot} />
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
    backgroundColor: "#F8F9FA",
  },
  header: {
    height: 56,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(192,201,190,0.3)",
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
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1B1B",
    letterSpacing: -0.2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconHeaderBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90,
    gap: 14,
  },

  /* TAB SWITCHER */
  segmentedContainer: {
    backgroundColor: "#EAE7E7",
    borderRadius: 8,
    padding: 3,
    flexDirection: "row",
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentBtnActive: {
    backgroundColor: "#FFFFFF",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
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

  /* BALANCES GRID */
  metricsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  balanceCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.6)",
    justifyContent: "space-between",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  balanceLabel: {
    fontSize: 10,
    color: "#414941",
    fontWeight: "600",
  },
  balanceValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  balanceUnit: {
    fontSize: 10,
    color: "#414941",
    marginLeft: 2,
  },
  textPrimary: { color: "#003E1C" },
  textDark: { color: "#1C1B1B" },
  textSecondary: { color: "#256D00" },
  progressBarTrack: {
    height: 4,
    backgroundColor: "#F0EDED",
    borderRadius: 2,
    marginTop: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#1E5631",
    borderRadius: 2,
  },

  /* CTA BUTTON */
  ctaButton: {
    height: 50,
    backgroundColor: "#1E5631",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    elevation: 3,
    shadowColor: "#1E5631",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  ctaButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  /* LIST SECTION */
  listSection: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C1B1B",
  },
  sectionSub: {
    fontSize: 11,
    color: "#414941",
  },
  requestCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.6)",
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  borderLeftYellow: { borderLeftWidth: 4, borderLeftColor: "#FFC107" },
  borderLeftGreen: { borderLeftWidth: 4, borderLeftColor: "#4C9A2A" },
  cardMain: {
    padding: 12,
    gap: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitleCluster: { flex: 1 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C1B1B",
  },
  tagCategory: {
    backgroundColor: "#F0EDED",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagCategoryText: {
    fontSize: 10,
    color: "#414941",
  },
  cardSub: {
    fontSize: 12,
    color: "#414941",
    marginTop: 2,
  },
  chipYellow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,193,7,0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  chipYellowText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#856404",
  },
  chipGreen: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(76,154,42,0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  chipGreenText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#003E1C",
  },
  dotSmall: { width: 5, height: 5, borderRadius: 2.5 },
  dotYellow: { backgroundColor: "#FFC107" },
  dotGreen: { backgroundColor: "#4C9A2A" },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(246,243,242,0.8)",
    padding: 8,
    borderRadius: 6,
  },
  scheduleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  scheduleDateText: {
    fontSize: 12,
    color: "#1C1B1B",
    fontWeight: "500",
  },
  badgeDurationPrimary: {
    backgroundColor: "rgba(181,241,191,0.4)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeDurationPrimaryText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#003E1C",
  },
  badgeDurationSecondary: {
    backgroundColor: "rgba(163,248,124,0.3)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeDurationSecondaryText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#256D00",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(192,201,190,0.3)",
    paddingTop: 8,
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
  detailBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#003E1C",
  },

  /* FORM VIEW */
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.7)",
    padding: 14,
    gap: 14,
  },
  formHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(192,201,190,0.4)",
    paddingBottom: 10,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C1B1B",
  },
  formSub: {
    fontSize: 12,
    color: "#414941",
    marginTop: 2,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1C1B1B",
  },
  requiredMark: { color: "#BA1A1A" },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C0C9BE",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 46,
    fontSize: 13,
    color: "#1C1B1B",
  },
  selectWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  selectIcon: {
    position: "absolute",
    right: 12,
  },
  dateRow: {
    flexDirection: "row",
    gap: 8,
  },
  dateInput: {
    flex: 1,
  },
  dateHintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  dateHintText: {
    fontSize: 11,
    color: "#414941",
  },
  textArea: {
    height: 80,
    paddingTop: 10,
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#C0C9BE",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(246,243,242,0.5)",
    gap: 4,
  },
  uploadIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(181,241,191,0.4)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  uploadTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#003E1C",
  },
  uploadSub: {
    fontSize: 11,
    color: "#414941",
  },
  inputWithIcon: {
    position: "relative",
    justifyContent: "center",
  },
  inputIconLeft: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
  actionCluster: {
    gap: 8,
    marginTop: 6,
  },
  submitBtn: {
    height: 48,
    backgroundColor: "#1E5631",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  cancelBtn: {
    height: 42,
    borderWidth: 1,
    borderColor: "#C0C9BE",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtnText: {
    color: "#414941",
    fontSize: 12,
    fontWeight: "600",
  },

  /* POLICY NOTICE */
  policyNoticeCard: {
    backgroundColor: "#F6F3F2",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(192,201,190,0.5)",
    flexDirection: "row",
    gap: 10,
  },
  policyTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1C1B1B",
  },
  policyBody: {
    fontSize: 11,
    color: "#414941",
    lineHeight: 16,
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
