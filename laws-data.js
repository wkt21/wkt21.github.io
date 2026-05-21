const lawsData = [
  // PART I
  {
    number: 1,
    part: 1,
    title: "Build the Foundation: Install Kali Rolling",
    quote: "Power begins with a stable battlefield.",
    purpose: "Set up a clean, secure Kali Rolling environment for all future operations.",
    explanation: "Kali is your controlled training ground. Installing it correctly ensures stability, safety, and repeatability. A misconfigured Kali system leads to broken tools, failed updates, and unreliable results.",
    commands: "sudo apt update && sudo apt full-upgrade -y\nsudo apt install -y open-vm-tools open-vm-tools-desktop",
    defensive: "A VM isolates your testing from production systems and prevents accidental network exposure.",
    tip: "Snapshot your VM before major changes — it's your rollback parachute."
  },
  {
    number: 2,
    part: 1,
    title: "Know Your Network: Master Interfaces & Routing",
    quote: "A warrior must know the terrain.",
    purpose: "Understand your network layout, interfaces, and routing paths.",
    explanation: "Before using any tool, you must know your IP, gateway, DNS, interface names, and routing table.",
    commands: "ip a\nip route\nnmcli device status",
    defensive: "Knowing your network prevents accidental scans outside your homelab.",
    tip: "Rename interfaces for clarity using /etc/udev/rules.d/."
  },
  {
    number: 3,
    part: 1,
    title: "See the Airwaves: Wi-Fi Monitoring (Defensive Only)",
    quote: "Awareness is the first shield.",
    purpose: "Monitor wireless activity in your own environment.",
    explanation: "Wi-Fi is noisy. Monitoring helps detect rogue APs, unknown devices, channel congestion, and probe requests.",
    commands: "sudo apt install -y aircrack-ng kismet\nsudo kismet",
    defensive: "Detect unauthorized devices or AP spoofing attempts.",
    tip: "Use a USB Wi-Fi adapter with monitor mode support."
  },
  {
    number: 4,
    part: 1,
    title: "Understand the Invisible: BLE Recon (Defensive)",
    quote: "Bluetooth is the forgotten attack surface.",
    purpose: "Monitor Bluetooth Low Energy devices in your environment.",
    explanation: "BLE devices constantly broadcast identifiers. Monitoring helps detect unknown beacons, smart devices, wearables, and tracking devices.",
    commands: "sudo apt install -y bluez bluez-tools\nsudo systemctl start bluetooth\nsudo hcitool lescan",
    defensive: "Identify unauthorized BLE devices near your home or office.",
    tip: "Use btmon for packet-level BLE analysis."
  },
  {
    number: 5,
    part: 1,
    title: "Know Your System: CPU, Memory & Process Visibility",
    quote: "A system you cannot see is a system you cannot defend.",
    purpose: "Monitor system performance and detect anomalies.",
    explanation: "High CPU, memory leaks, or unknown processes can indicate misconfigurations, malware, rogue services, or resource exhaustion.",
    commands: "sudo apt install -y htop sysstat\nhtop\nmpstat",
    defensive: "Spot suspicious processes early.",
    tip: "Sort by CPU or memory to identify spikes instantly."
  },
  {
    number: 6,
    part: 1,
    title: "Watch the Skies: Kismet Wireless IDS",
    quote: "Your perimeter begins in the air.",
    purpose: "Deploy a wireless intrusion detection system.",
    explanation: "Kismet detects new devices, AP spoofing, channel activity, and signal anomalies.",
    commands: "sudo apt install -y kismet\nsudo systemctl start kismet",
    defensive: "Identify unauthorized Wi-Fi activity around your property.",
    tip: "Forward Kismet logs to ELK for long-term analysis."
  },
  {
    number: 7,
    part: 1,
    title: "Build the Eye: ELK Stack Installation",
    quote: "Logs are truth. Truth is power.",
    purpose: "Install Elasticsearch, Logstash, Kibana, and Filebeat.",
    explanation: "ELK centralizes logs from Kismet, Bettercap, system logs, Nmap, and custom scripts.",
    commands: "sudo apt install -y elasticsearch kibana filebeat\nsudo systemctl enable elasticsearch kibana filebeat",
    defensive: "Centralized logs = faster detection.",
    tip: "Use Kibana's Lens feature for instant visualizations."
  },
  {
    number: 8,
    part: 1,
    title: "Visualize Everything: Dashboards",
    quote: "What you can see, you can control.",
    purpose: "Build dashboards for system and network visibility.",
    explanation: "Dashboards help track CPU, memory, network traffic, wireless events, and Nmap results.",
    commands: "Open Kibana → Create index pattern: filebeat-* → Build visualizations → Add to dashboard",
    defensive: "Dashboards reveal anomalies instantly.",
    tip: "Use color thresholds for alerts."
  },
  {
    number: 9,
    part: 1,
    title: "Harden the Fortress: System Security",
    quote: "Defense is the first discipline of power.",
    purpose: "Secure your Kali VM.",
    explanation: "Hardening reduces attack surface by enabling firewalls, blocking unwanted ports, and monitoring failed logins.",
    commands: "sudo apt install -y ufw fail2ban\nsudo ufw enable\nsudo systemctl enable fail2ban",
    defensive: "Prevents brute-force attacks and unauthorized access.",
    tip: "Whitelist only your Tailscale IP."
  },
  {
    number: 10,
    part: 1,
    title: "Test Your Own Apps: Burp Suite (Defensive)",
    quote: "A tool is only dangerous in the wrong hands.",
    purpose: "Use Burp Suite to test your own web applications.",
    explanation: "Burp helps identify misconfigurations, input validation issues, and session problems.",
    commands: "sudo apt install -y burpsuite\nburpsuite",
    defensive: "Fix vulnerabilities before attackers find them.",
    tip: "Use Burp's Repeater to test edge cases safely."
  },
  // PART II
  {
    number: 11,
    part: 2,
    title: "Know Thy Ports: Full Port Scanning with Nmap",
    quote: "A closed port is a closed opportunity.",
    purpose: "Learn how to scan your own systems safely and interpret results.",
    explanation: "Nmap is the foundation of reconnaissance — but only when used legally on systems you own.",
    commands: "sudo nmap -sT -p- 192.168.12.129\nsudo nmap -sV 192.168.12.129\nsudo nmap -O 192.168.12.129",
    defensive: "Identify unnecessary services running on your own machines.",
    tip: "Use -oN scan.txt to save results for ELK ingestion."
  },
  {
    number: 12,
    part: 2,
    title: "Know Thy Services: Service Enumeration",
    quote: "Every service tells a story.",
    purpose: "Identify what's running on your system and why.",
    explanation: "Service enumeration reveals running daemons, listening ports, startup services, and misconfigurations.",
    commands: "sudo ss -tulpn\nsystemctl list-units --type=service\nsudo netstat -tulpn",
    defensive: "Spot unauthorized services early.",
    tip: "Disable anything you don't use."
  },
  {
    number: 13,
    part: 2,
    title: "Build the Mesh: Tailscale & Zero-Trust Networking",
    quote: "Your network should trust no one — not even you.",
    purpose: "Create a secure, encrypted mesh network for your homelab.",
    explanation: "Tailscale gives you private IPs, encrypted tunnels, device-level ACLs, and zero-trust access.",
    commands: "curl -fsSL https://tailscale.com/install.sh | sh\nsudo tailscale up",
    defensive: "Access your homelab securely from anywhere.",
    tip: "Use Tailscale SSH to eliminate port 22 exposure."
  },
  {
    number: 14,
    part: 2,
    title: "Build the Gate: Twingate Access Control",
    quote: "Identity is the new perimeter.",
    purpose: "Add identity-based access to your homelab.",
    explanation: "Twingate provides role-based access, resource segmentation, and zero-trust enforcement.",
    commands: "sudo apt install -y twingate\nsudo twingate setup",
    defensive: "Protect sensitive services behind identity checks.",
    tip: "Combine Tailscale + Twingate for layered defense."
  },
  {
    number: 15,
    part: 2,
    title: "Know Thy Traffic: Wireshark Mastery",
    quote: "Packets don't lie.",
    purpose: "Analyze network traffic at the packet level.",
    explanation: "Wireshark reveals protocol behavior, suspicious traffic, misconfigurations, and DNS leaks.",
    commands: "sudo apt install -y wireshark\nsudo wireshark",
    defensive: "Detect anomalies and unauthorized connections.",
    tip: "Use display filters like: http, tcp.flags.syn==1, dns"
  },
  {
    number: 16,
    part: 2,
    title: "Know Thy Logs: System Logging & Journalctl",
    quote: "Logs are the memory of your machine.",
    purpose: "Master system logs for detection and troubleshooting.",
    explanation: "Logs reveal failed logins, system errors, service crashes, and suspicious activity.",
    commands: "journalctl -xe\njournalctl -u ssh\nsudo tail -f /var/log/auth.log",
    defensive: "Spot brute-force attempts and misconfigurations.",
    tip: "Forward logs to ELK for long-term retention."
  },
  {
    number: 17,
    part: 2,
    title: "Know Thy Files: File Integrity Monitoring",
    quote: "A changed file is a changed fate.",
    purpose: "Detect unauthorized file modifications.",
    explanation: "AIDE and Auditd track file changes, permission changes, and unexpected modifications.",
    commands: "sudo apt install -y aide auditd\nsudo aideinit\nsudo auditctl -w /etc -p wa -k etc_changes",
    defensive: "Detect tampering early.",
    tip: "Monitor /etc, /var/log, and /usr/bin."
  },
  {
    number: 18,
    part: 2,
    title: "Know Thy Secrets: Encryption & Key Management",
    quote: "Power without secrecy is weakness.",
    purpose: "Encrypt files, folders, and backups.",
    explanation: "Use GPG for files, LUKS for volumes, and EncFS for folders.",
    commands: "gpg -c secrets.txt\nsudo cryptsetup luksFormat /opt/secure.img\nencfs ~/encrypted ~/decrypted",
    defensive: "Protect sensitive data from theft or exposure.",
    tip: "Use ECC keys for faster, stronger encryption."
  },
  {
    number: 19,
    part: 2,
    title: "Know Thy Users: Secure User & Group Management",
    quote: "Access is privilege. Privilege is power.",
    purpose: "Manage users safely and restrict access.",
    explanation: "User management prevents unauthorized access, privilege escalation, and misuse of accounts.",
    commands: "sudo adduser analyst\nsudo usermod -aG sudo analyst\nsudo passwd -l guest",
    defensive: "Limit who can do what on your system.",
    tip: "Use service accounts for automation scripts."
  },
  {
    number: 20,
    part: 2,
    title: "Know Thy Automation: Cron & Systemd",
    quote: "Automation is the multiplier of power.",
    purpose: "Automate tasks and create secure services.",
    explanation: "Automation handles backups, scans, monitoring, and log rotation.",
    commands: "crontab -e\n0 3 * * * /home/kali/daily_scan.sh\nsudo systemctl enable wkt && sudo systemctl start wkt",
    defensive: "Automated scans catch issues early.",
    tip: "Use systemd for long-running services."
  },
  // PART III
  {
    number: 21,
    part: 3,
    title: "Know Thy Vulnerabilities: Nmap Vulnerability Scanning",
    quote: "You cannot defend what you do not understand.",
    purpose: "Use Nmap's vulnerability scripts to assess your own systems.",
    explanation: "Nmap's NSE engine can detect weak configurations, missing patches, unsafe services, and web vulnerabilities.",
    commands: "sudo nmap --script vuln 192.168.12.129\nsudo nmap --script http-enum -p80 192.168.12.129\nsudo nmap -sV --script banner 192.168.12.129",
    defensive: "Identify weak services before attackers do.",
    tip: "Pipe results into ELK for historical tracking."
  },
  {
    number: 22,
    part: 3,
    title: "Harden the Web: Apache Security",
    quote: "A single misconfigured server can betray the entire fortress.",
    purpose: "Secure Apache on your Kali system.",
    explanation: "Apache often runs locally for dashboards or tools. Hardening prevents info leaks, directory exposure, and module abuse.",
    commands: "sudo a2dismod status && sudo a2dismod autoindex\nsudo nano /etc/apache2/conf-available/security.conf\nsudo systemctl restart apache2",
    defensive: "Prevents fingerprinting and reduces attack surface.",
    tip: "Use self-signed HTTPS even in your homelab."
  },
  {
    number: 23,
    part: 3,
    title: "Know Thy Services: Enumeration Mastery",
    quote: "Every open port is a conversation. Listen.",
    purpose: "Enumerate services deeply and safely.",
    explanation: "Service enumeration reveals versions, configurations, misconfigurations, and hidden endpoints.",
    commands: "sudo ss -tulpn\ncurl -I http://192.168.12.129\ngobuster dir -u http://192.168.12.129 -w /usr/share/wordlists/dirb/common.txt",
    defensive: "Spot outdated or unnecessary services.",
    tip: "Use -sV with Nmap to fingerprint versions."
  },
  {
    number: 24,
    part: 3,
    title: "Visualize the Ports: Build a Monitoring Dashboard",
    quote: "Visibility is the antidote to surprise.",
    purpose: "Create a real-time port monitoring dashboard in Kibana.",
    explanation: "Track new services, port changes, and unexpected activity.",
    commands: "sudo filebeat modules enable system\nsudo systemctl restart filebeat",
    defensive: "Detect unauthorized services instantly.",
    tip: "Add color thresholds for high-risk ports."
  },
  {
    number: 25,
    part: 3,
    title: "Automate the Hunt: Scheduled Nmap Scans",
    quote: "Consistency beats chaos.",
    purpose: "Automate daily scans of your own systems.",
    explanation: "Automation ensures continuous monitoring, early detection, and historical comparison.",
    commands: "nano ~/daily_scan.sh\nnmap -sV -oX /var/log/nmap/daily_$(date +%F).xml 192.168.12.129\n0 3 * * * /home/kali/daily_scan.sh",
    defensive: "Detect new services or changes automatically.",
    tip: "Use xsltproc to convert XML to HTML reports."
  },
  {
    number: 26,
    part: 3,
    title: "Control the Services: System Hardening & Monitoring",
    quote: "A system with no discipline is a system with no future.",
    purpose: "Identify and disable unnecessary services.",
    explanation: "Every running service is a potential risk.",
    commands: "systemctl list-unit-files | grep enabled\nsudo systemctl disable bluetooth\nsudo systemctl stop bluetooth",
    defensive: "Reduces attack surface dramatically.",
    tip: "Disable printing services if unused."
  },
  {
    number: 27,
    part: 3,
    title: "Know Thy Logs: Syslog, Journalctl & Filebeat",
    quote: "Logs are the diary of your machine.",
    purpose: "Master system logs and forward them to ELK.",
    explanation: "Logs reveal errors, attacks, misconfigurations, and behavior patterns.",
    commands: "journalctl -xe\nsudo tail -f /var/log/syslog\nsudo tail -f /var/log/auth.log",
    defensive: "Centralized logs = faster detection.",
    tip: "Use Kibana's Discover tab for rapid filtering."
  },
  {
    number: 28,
    part: 3,
    title: "Guard the Gate: Secure Remote Administration",
    quote: "Access is privilege. Protect it.",
    purpose: "Harden SSH and secure remote access.",
    explanation: "SSH is powerful — and dangerous if misconfigured. Disable password login, disallow root login.",
    commands: "sudo nano /etc/ssh/sshd_config\n# Set: PasswordAuthentication no / PermitRootLogin no\nsudo systemctl restart ssh",
    defensive: "Prevents brute-force attacks.",
    tip: "Use Tailscale SSH to eliminate port exposure."
  },
  {
    number: 29,
    part: 3,
    title: "Protect the Data: Backup, Snapshots & Recovery",
    quote: "Power is nothing without resilience.",
    purpose: "Create encrypted backups and VM snapshots.",
    explanation: "Backups protect you from corruption, mistakes, and failed updates.",
    commands: "sudo tar -czvf kali_backup_$(date +%F).tar.gz /etc /home /var/log\n# In VMware: VM → Snapshot → Take Snapshot",
    defensive: "Ensures you never lose progress.",
    tip: "Automate weekly backups with cron."
  },
  {
    number: 30,
    part: 3,
    title: "Automate the System: Cron, Scripts & Systemd",
    quote: "Automation is the engine of mastery.",
    purpose: "Automate tasks and create secure services.",
    explanation: "Automation handles scans, backups, monitoring, and log rotation.",
    commands: "sudo nano /etc/systemd/system/wkt.service\nsudo systemctl enable wkt\nsudo systemctl start wkt",
    defensive: "Automation reduces human error.",
    tip: "Use systemd timers instead of cron for reliability."
  },
  // PART IV
  {
    number: 31,
    part: 4,
    title: "Command the Filesystem: Secure Folder & File Management",
    quote: "Control your files, or your files will control you.",
    purpose: "Learn how to create, secure, hide, and protect files and folders on Linux.",
    explanation: "Linux gives you powerful tools to create structured directories, set permissions, hide sensitive folders, and protect files from modification.",
    commands: "sudo mkdir -p /srv/wkt/logs/archive\nsudo chmod 700 /opt/wkt && sudo chown adam:adam /opt/wkt\nsudo chattr +i /opt/.wkt/config.yaml",
    defensive: "Prevents accidental or unauthorized modification.",
    tip: "Use lsattr to detect immutable files."
  },
  {
    number: 32,
    part: 4,
    title: "Guard the Integrity: File Integrity Monitoring (FIM)",
    quote: "A changed file is a changed system.",
    purpose: "Detect unauthorized file changes.",
    explanation: "Tools like AIDE and Auditd track file modifications, permission changes, and unexpected behavior.",
    commands: "sudo apt install -y aide auditd\nsudo aideinit\nsudo auditctl -w /etc -p wa -k etc_changes",
    defensive: "Detects tampering early.",
    tip: "Monitor /etc, /var/log, and /usr/bin."
  },
  {
    number: 33,
    part: 4,
    title: "Encrypt the Vault: Folder & Volume Encryption",
    quote: "Your secrets deserve armor.",
    purpose: "Encrypt files, folders, and entire volumes.",
    explanation: "Use GPG for files, EncFS for folders, and LUKS for volumes.",
    commands: "gpg -c secrets.txt\nencfs ~/encrypted ~/decrypted\nsudo cryptsetup luksFormat /opt/secure.img",
    defensive: "Protects sensitive data from theft or exposure.",
    tip: "Use ECC keys for faster encryption."
  },
  {
    number: 34,
    part: 4,
    title: "Command the System: Systemd Service Creation",
    quote: "Automation is the skeleton of power.",
    purpose: "Create secure systemd services.",
    explanation: "Systemd lets you run scripts at boot, create long-running services, and restrict permissions.",
    commands: "sudo nano /etc/systemd/system/wkt.service\nsudo systemctl enable wkt\nsudo systemctl start wkt",
    defensive: "Ensures critical tasks run reliably.",
    tip: "Use ProtectSystem=full for hardened services."
  },
  {
    number: 35,
    part: 4,
    title: "Command the Users: Secure User & Group Management",
    quote: "Access defines power.",
    purpose: "Manage users safely and restrict access.",
    explanation: "User management prevents unauthorized access, privilege escalation, and misuse of accounts.",
    commands: "sudo adduser analyst\nsudo usermod -aG sudo analyst\nsudo passwd -l guest",
    defensive: "Limits who can do what on your system.",
    tip: "Use service accounts for automation."
  },
  {
    number: 36,
    part: 4,
    title: "Command the Scripts: Defensive Automation",
    quote: "A script a day keeps chaos away.",
    purpose: "Write defensive scripts for monitoring and automation.",
    explanation: "Scripts help automate health checks, log parsing, and alerts.",
    commands: "nano ~/healthcheck.sh\n#!/bin/bash\nmpstat\nfree -h\ndf -h\nchmod +x ~/healthcheck.sh",
    defensive: "Detects issues before they escalate.",
    tip: "Use Python for advanced log parsing."
  },
  {
    number: 37,
    part: 4,
    title: "Command the Keys: RSA & ECC Encryption",
    quote: "Keys are the currency of trust.",
    purpose: "Generate and use RSA and ECC keys.",
    explanation: "Use RSA for compatibility, ECC for speed and strength.",
    commands: "openssl genrsa -out private.key 4096\nopenssl ecparam -name prime256v1 -genkey -noout -out ecc.key\nssh-keygen -t ed25519",
    defensive: "Protects communication and data.",
    tip: "Use ECC for SSH keys."
  },
  {
    number: 38,
    part: 4,
    title: "Command the Permissions: ACL Mastery",
    quote: "Fine-grained control is fine-grained power.",
    purpose: "Use Access Control Lists for advanced permissions.",
    explanation: "ACLs allow per-user permissions, per-group permissions, and fine-tuned access.",
    commands: "sudo setfacl -m u:adam:rw /opt/wkt\ngetfacl /opt/wkt\nsudo setfacl -b /opt/wkt",
    defensive: "Protects sensitive directories.",
    tip: "Use ACLs for shared project folders."
  },
  {
    number: 39,
    part: 4,
    title: "Command the Backups: Encrypted Backup Automation",
    quote: "A system without backups is a system waiting to die.",
    purpose: "Create encrypted backups and automate them.",
    explanation: "Use Borg or Duplicity for encrypted backups.",
    commands: "borg init --encryption=repokey /opt/borgrepo\nborg create /opt/borgrepo::backup-$(date +%F) /etc /home",
    defensive: "Protects against corruption and loss.",
    tip: "Store backups on an external drive."
  },
  {
    number: 40,
    part: 4,
    title: "Command the Architecture: Zero-Trust Server Layout",
    quote: "Trust nothing. Verify everything.",
    purpose: "Design a secure, segmented homelab.",
    explanation: "Zero-trust means no implicit trust, identity-based access, and segmented resources.",
    commands: "sudo ufw allow from 100.0.0.0/8 to any port 22\nsudo ufw deny 80\ntailscale acl edit",
    defensive: "Prevents lateral movement.",
    tip: "Use separate VMs for each major service."
  },
  // PART V
  {
    number: 41,
    part: 5,
    title: "Hide the Identity: MAC Privacy & Defensive Spoofing",
    quote: "Your MAC address is your fingerprint. Protect it.",
    purpose: "Prevent MAC-based tracking and reduce exposure in MiTM environments.",
    explanation: "Your MAC address reveals device vendor, device type, network history, and identity correlation. Randomizing your MAC protects your privacy.",
    commands: "sudo nano /etc/NetworkManager/NetworkManager.conf\n# Add: wifi.scan-rand-mac-address=yes / wifi.cloned-mac-address=random\nsudo systemctl restart NetworkManager",
    defensive: "Prevents MAC harvesting during MiTM attacks.",
    tip: "Use a USB Wi-Fi adapter dedicated to monitoring."
  },
  {
    number: 42,
    part: 5,
    title: "Defend the Air: ARP Poisoning Detection",
    quote: "If the gateway lies, the network dies.",
    purpose: "Detect ARP spoofing attempts in your own network.",
    explanation: "ARP poisoning is used to intercept traffic, redirect traffic, and perform MiTM attacks. Detecting it early is critical.",
    commands: "sudo apt install -y arpwatch arp-scan\nsudo arp-scan --localnet\nsudo systemctl enable arpwatch && sudo systemctl start arpwatch",
    defensive: "Identifies rogue devices and ARP manipulation.",
    tip: "Use static ARP entries for critical systems."
  },
  {
    number: 43,
    part: 5,
    title: "Defend the Lease: DHCP Fingerprinting Defense",
    quote: "Your DHCP request reveals more than you think.",
    purpose: "Reduce DHCP fingerprint leakage.",
    explanation: "DHCP reveals OS type, device type, and behavior patterns. Minimizing this reduces tracking.",
    commands: "sudo nano /etc/dhcp/dhclient.conf\n# Add: send host-name 'generic'; send vendor-class-identifier 'generic';\nsudo dhclient -r && sudo dhclient",
    defensive: "Prevents OS fingerprinting on untrusted networks.",
    tip: "Use Tailscale to bypass local DHCP entirely."
  },
  {
    number: 44,
    part: 5,
    title: "Minimize the Noise: Network Metadata Reduction",
    quote: "The less you reveal, the less you risk.",
    purpose: "Reduce metadata leakage from your Kali system.",
    explanation: "Disable unnecessary protocols: mDNS, IPv6 (optional), and hostname broadcasting.",
    commands: "sudo systemctl disable avahi-daemon && sudo systemctl stop avahi-daemon\nsudo nano /etc/sysctl.conf\n# Add: net.ipv6.conf.all.disable_ipv6 = 1",
    defensive: "Reduces attack surface and fingerprinting.",
    tip: "Use generic hostnames like kali."
  },
  {
    number: 45,
    part: 5,
    title: "Defend the Client: Secure Wi-Fi Behavior",
    quote: "Your device should never trust first.",
    purpose: "Secure your Wi-Fi client behavior.",
    explanation: "Wi-Fi clients leak probe requests, preferred networks, and MAC addresses.",
    commands: "nmcli connection modify <SSID> connection.autoconnect no\nsudo airodump-ng wlan0",
    defensive: "Prevents rogue AP attacks.",
    tip: "Forget networks you no longer use."
  },
  {
    number: 46,
    part: 5,
    title: "Segment the Kingdom: Network Segmentation",
    quote: "A breach in one zone must never compromise all zones.",
    purpose: "Segment your homelab into isolated zones.",
    explanation: "Segmentation prevents lateral movement.",
    commands: "sudo ufw allow from 100.0.0.0/8 to any port 22\nsudo ufw deny 80",
    defensive: "Limits the blast radius of a compromise.",
    tip: "Use VLANs if your router supports them."
  },
  {
    number: 47,
    part: 5,
    title: "Detect the Threat: Behavioral Monitoring",
    quote: "Behavior reveals intent.",
    purpose: "Monitor system behavior for anomalies.",
    explanation: "Behavioral monitoring detects CPU spikes, memory leaks, unknown processes, and suspicious connections.",
    commands: "htop\nsudo ss -tulpn\nsudo lsof -i",
    defensive: "Detects threats early.",
    tip: "Use ELK dashboards for long-term trends."
  },
  {
    number: 48,
    part: 5,
    title: "Architect the Lab: Build a Professional Homelab",
    quote: "A warrior trains in a controlled arena.",
    purpose: "Design a full red-team defensive homelab.",
    explanation: "A proper homelab includes a Kali VM, Windows VM, Linux server, ELK stack, Tailscale mesh, and segmented networks.",
    commands: "# Build comprehensive homelab with multiple VMs and services",
    defensive: "Provides a safe environment to learn and test.",
    tip: "Document your lab like a real SOC."
  },
  {
    number: 49,
    part: 5,
    title: "Master the Discipline: Operational Security (OPSEC)",
    quote: "Power without discipline becomes self-destruction.",
    purpose: "Develop safe, ethical, and disciplined habits.",
    explanation: "OPSEC includes not scanning networks you don't own, not testing systems without permission, keeping logs secure, using encryption, and practicing least privilege.",
    commands: "sudo nano /etc/logrotate.conf\nhistory -c",
    defensive: "Protects you legally and operationally.",
    tip: "Always document your actions in your homelab."
  },
  {
    number: 50,
    part: 5,
    title: "Become the Weapon: The Red-Team Mindset",
    quote: "Tools don't make the operator. Mindset does.",
    purpose: "Understand the mindset required for ethical red-team mastery.",
    explanation: "The red-team mindset is: Curious, Analytical, Disciplined, Ethical, Patient, and Defensive-first. This law ties the entire book together.",
    commands: "Develop mindset and discipline",
    defensive: "You become a protector, not a threat.",
    tip: "Never stop learning. Never stop testing. Never stop improving."
  }
];

const referenceGuide = [
  { num: 1, title: "Install Kali Rolling", takeaway: "Stable VM foundation for all operations", tool: "VMware + apt" },
  { num: 2, title: "Network Interfaces", takeaway: "Know your IP, gateway, DNS before anything else", tool: "ip / nmcli" },
  { num: 3, title: "Wi-Fi Monitoring", takeaway: "Detect rogue APs and unknown wireless devices", tool: "Kismet" },
  { num: 4, title: "BLE Recon", takeaway: "Monitor Bluetooth LE for unauthorized devices", tool: "hcitool / btmon" },
  { num: 5, title: "CPU/Memory Visibility", takeaway: "Spot anomalies via process monitoring", tool: "htop / mpstat" },
  { num: 6, title: "Kismet IDS", takeaway: "Wireless intrusion detection in your environment", tool: "Kismet" },
  { num: 7, title: "ELK Stack", takeaway: "Centralize logs for rapid detection", tool: "Elasticsearch/Kibana" },
  { num: 8, title: "Dashboards", takeaway: "Visualize system and network data", tool: "Kibana" },
  { num: 9, title: "System Hardening", takeaway: "UFW + Fail2ban to block brute-force", tool: "ufw / fail2ban" },
  { num: 10, title: "Burp Suite", takeaway: "Test your own web apps for vulnerabilities", tool: "BurpSuite" },
  { num: 11, title: "Port Scanning", takeaway: "Full scan to find open services on owned systems", tool: "nmap" },
  { num: 12, title: "Service Enumeration", takeaway: "Identify all running daemons and ports", tool: "ss / netstat" },
  { num: 13, title: "Tailscale Mesh", takeaway: "Zero-trust encrypted mesh for homelabs", tool: "Tailscale" },
  { num: 14, title: "Twingate", takeaway: "Identity-based access control layer", tool: "Twingate" },
  { num: 15, title: "Wireshark", takeaway: "Packet-level traffic analysis", tool: "Wireshark" },
  { num: 16, title: "System Logs", takeaway: "journalctl and auth.log for attack detection", tool: "journalctl" },
  { num: 17, title: "File Integrity", takeaway: "Detect unauthorized file changes (AIDE)", tool: "AIDE / Auditd" },
  { num: 18, title: "Encryption Keys", takeaway: "Encrypt files, volumes, backups", tool: "GPG / LUKS" },
  { num: 19, title: "User Management", takeaway: "Restrict access with groups and permissions", tool: "adduser / passwd" },
  { num: 20, title: "Cron & Systemd", takeaway: "Automate scans, backups, monitoring", tool: "cron / systemctl" },
  { num: 21, title: "Nmap Vuln Scan", takeaway: "NSE scripts to find weaknesses on own systems", tool: "nmap --script vuln" },
  { num: 22, title: "Apache Security", takeaway: "Disable dangerous modules, hide server info", tool: "a2dismod" },
  { num: 23, title: "Deep Enumeration", takeaway: "Gobuster + curl for service fingerprinting", tool: "gobuster" },
  { num: 24, title: "Port Dashboard", takeaway: "Kibana dashboard for real-time port tracking", tool: "Filebeat + Kibana" },
  { num: 25, title: "Scheduled Scans", takeaway: "Cron + Nmap for continuous monitoring", tool: "cron + nmap" },
  { num: 26, title: "Disable Services", takeaway: "Kill unnecessary services to cut attack surface", tool: "systemctl" },
  { num: 27, title: "Log Forwarding", takeaway: "Send system logs to ELK via Filebeat", tool: "Filebeat" },
  { num: 28, title: "Secure SSH", takeaway: "Keys only, no root, no password auth", tool: "sshd_config" },
  { num: 29, title: "Backups/Snapshots", takeaway: "Encrypted tar + VMware snapshots", tool: "tar / VMware" },
  { num: 30, title: "Systemd Services", takeaway: "Create reliable automated services", tool: "systemd" },
  { num: 31, title: "Filesystem Security", takeaway: "chmod, chattr, dotfiles for file protection", tool: "chattr / chmod" },
  { num: 32, title: "FIM with AIDE", takeaway: "Baseline + monitor all critical file changes", tool: "AIDE / Auditd" },
  { num: 33, title: "Vault Encryption", takeaway: "GPG + EncFS + LUKS for data at rest", tool: "GPG/EncFS/LUKS" },
  { num: 34, title: "Systemd Creation", takeaway: "Hardened services with ProtectSystem=full", tool: "systemd" },
  { num: 35, title: "User/Group ACL", takeaway: "Limit user privileges to minimum needed", tool: "usermod / passwd" },
  { num: 36, title: "Defensive Scripts", takeaway: "Health check scripts for daily monitoring", tool: "bash / python" },
  { num: 37, title: "RSA & ECC Keys", takeaway: "Generate strong keys for SSH and encryption", tool: "openssl / ssh-keygen" },
  { num: 38, title: "ACL Mastery", takeaway: "Per-user/group file access control", tool: "setfacl / getfacl" },
  { num: 39, title: "Encrypted Backups", takeaway: "Borg for automated encrypted backups", tool: "borg" },
  { num: 40, title: "Zero-Trust Layout", takeaway: "Segmented VMs with UFW + Tailscale ACLs", tool: "UFW / Tailscale" },
  { num: 41, title: "MAC Privacy", takeaway: "Randomize MAC to prevent tracking", tool: "NetworkManager" },
  { num: 42, title: "ARP Defense", takeaway: "Detect ARP spoofing with arpwatch", tool: "arpwatch / arp-scan" },
  { num: 43, title: "DHCP Defense", takeaway: "Minimize DHCP fingerprint leakage", tool: "dhclient.conf" },
  { num: 44, title: "Metadata Reduction", takeaway: "Disable mDNS and IPv6 broadcasting", tool: "avahi / sysctl" },
  { num: 45, title: "Wi-Fi Client Security", takeaway: "No auto-connect, forget old networks", tool: "nmcli" },
  { num: 46, title: "Network Segmentation", takeaway: "UFW zones to limit blast radius", tool: "UFW / VLANs" },
  { num: 47, title: "Behavioral Monitoring", takeaway: "htop + lsof for anomaly detection", tool: "htop / lsof" },
  { num: 48, title: "Homelab Architecture", takeaway: "Kali + ELK + Tailscale + segmented VMs", tool: "Full stack" },
  { num: 49, title: "OPSEC Discipline", takeaway: "Ethics, documentation, least privilege", tool: "mindset" },
  { num: 50, title: "Red-Team Mindset", takeaway: "Curious, ethical, defensive-first", tool: "mindset" }
];

const framework = [
  {
    title: "SEE",
    description: "Monitor everything — logs, network, files, processes"
  },
  {
    title: "KNOW",
    description: "Understand what's normal before you can detect abnormal"
  },
  {
    title: "HARDEN",
    description: "Close every unnecessary door before attackers find it"
  },
  {
    title: "AUTOMATE",
    description: "Consistent automated monitoring beats manual checks"
  },
  {
    title: "RESPOND",
    description: "Fast detection + documented procedures = resilience"
  },
  {
    title: "EVOLVE",
    description: "The threat landscape changes. Your skills must too"
  }
];