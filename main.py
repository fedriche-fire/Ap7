import os
import platform
import socket
from datetime import datetime

# Couleurs pour le terminal (Codes ANSI)
GREEN = '\033[92m'
CYAN = '\033[96m'
YELLOW = '\033[93m'
RED = '\033[91m'
RESET = '\033[0m'

def display_banner():
    banner = f"""
{GREEN}==========================================
    SYSTEM MONITORING DASHBOARD
=========================================={RESET}
Version    : v1.0.0
Author     : teste en cours
Status     : Local Scan Only
------------------------------------------"""
    print(banner)

def get_local_info():
    """Récupère des informations sur votre propre machine."""
    print(f"{CYAN}[*] Collecte des informations système...{RESET}")
    
    info = {
        "OS": platform.system(),
        "Version OS": platform.release(),
        "Hostname": socket.gethostname(),
        "IP Locale": socket.gethostbyname(socket.gethostname()),
        "Heure": datetime.now().strftime("%H:%M:%S")
    }
    return info

def start_dashboard():
    os.system('cls' if os.name == 'nt' else 'clear')
    display_banner()
    
    data = get_local_info()
    
    print(f"{YELLOW}>>> CONFIGURATION LOCALE{RESET}")
    for key, value in data.items():
        print(f" {GREEN}»{RESET} {key.ljust(12)} : {value}")
    
    print(f"\n{CYAN}[+] En attente d'activité sur le port 8080...{RESET}")
    print(f"{RED}[!] Appuyez sur Ctrl+C pour arrêter le script.{RESET}")

if __name__ == "__main__":
    try:
        start_dashboard()
        # Ici, on pourrait ajouter une boucle de serveur web (HTTP)
    except KeyboardInterrupt:
        print(f"\n{YELLOW}[!] Arrêt du programme.{RESET}")
