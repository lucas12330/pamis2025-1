# Programme de Lucas Bezanilla Bou
# Adaptable selon le contexte du concour

from microbit import *
import maqueen

start_time = -1  # Programme non démarré
servoBool = True
vide = True

def countTime():
    global start_time, servoBool, vide

    # Vérifier si le capteur P0 est activé et que le programme n'a pas encore démarré
    if start_time == -1 and pins.digital_read_pin(DigitalPin.P0) == 0:
        start_time = control.millis()  # Démarrer le timer une seule fois

    # Exécuter la logique seulement si le programme a commencé
    if start_time != -1:
        time = control.millis() - start_time  # Temps écoulé

        if 3000<time < 9650:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 200)
        elif time < 9850:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 100)
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

basic.forever(countTime)

def on_forever():
    global vide
    vide = maqueen.ultrasonic() <= 5  # Met à jour `vide` automatiquement

basic.forever(on_forever)
