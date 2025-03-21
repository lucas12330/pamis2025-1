# Programme de Lucas Bezanilla Bou
# Adaptable selon le contexte du concour

# Les direction sont sois CW sois CCW

from microbit import *
import maqueen

start_time = -1  # Programme non démarré
servoBool = True
vide = True
cotes = ""

# Ajout des fonction de choix de cotès
def Gauche():
    cotes = "gauche"
input.on_button_pressed(Button.A, Gauche)

def Droite():
    cotes = "droite"
input.on_button_pressed(Button.B, Droite)

def countTime():
    global start_time, servoBool, vide, cotes

    # Vérifier si le capteur P0 est activé et que le programme n'a pas encore démarré
    if start_time == -1 and pins.digital_read_pin(DigitalPin.P0) == 0:
        start_time = control.millis()  # Démarrer le timer une seule fois

    # Exécuter la logique seulement si le programme a commencé
    if start_time != -1:
        time = control.millis() - start_time  # Temps écoulé
        
        # Réaliser pour le cotès gauche
        if (cotes == "gauche"):

            # Les temps sont a changé le jour du concour 85k<time<91650
            if 3000<time < 9650:
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            # Les temps ici le jour du concour sont time<91850
            elif time < 9850:
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 100)
            #Pour cette action les temps sont time < 100000:
            elif time < 18000 and vide:
                maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 17)
            elif servoBool:
                maqueen.motor_stop(maqueen.Motors.ALL)
                # Peut être modifier mais avec prudence suivant les recomandation des arbitre
                # ainsi que des juges d'homologation
                for i in range(4):
                    maqueen.servo_run(maqueen.Servos.S1, 180)
                    basic.pause(200)
                    maqueen.servo_run(maqueen.Servos.S1, 0)
                    basic.pause(200)
                    maqueen.servo_run(maqueen.Servos.S1, 180)
                servoBool = False
            else:
                maqueen.motor_stop(maqueen.Motors.ALL)
        #Réaliser pour le cotès droit
        elif (cotes == "droite"):
            # Les temps sont a changé le jour du concour 85k<time<91650
            if 3000<time < 9650: #Permet de faire passer cette action dans un intervalle de temps
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            # Les temps ici le jour du concour sont time<91850
            elif time < 9850:
                # Pour le cotès droit ils faut simplement changé le sens 
                # De rotation du Pami
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 100)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
            #Pour cette action les temps sont time < 100000: 
            elif time < 18000 and vide:
                maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 17)
            elif servoBool:
                maqueen.motor_stop(maqueen.Motors.ALL)
                for i in range(4):
                    maqueen.servo_run(maqueen.Servos.S1, 180)
                    basic.pause(200)
                    maqueen.servo_run(maqueen.Servos.S1, 0)
                    basic.pause(200)
                    maqueen.servo_run(maqueen.Servos.S1, 180)
                servoBool = False
            else:
                maqueen.motor_stop(maqueen.Motors.ALL)
basic.forever(countTime) # ne jamais remplacer par des while true car ce sont des boucle fermé

def on_forever():
    global vide
    vide = maqueen.ultrasonic() <= 5  # Met à jour `vide` automatiquement
basic.forever(on_forever) # Ne jamais remplacer par des while true car se sont des boucles fermé
