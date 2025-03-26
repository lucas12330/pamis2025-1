from microbit import *
import maqueen

pins.set_pull(DigitalPin.P0, PinPullMode.PULL_UP)

start_time = -1  # Programme non démarré
servoBool = True
vide = True
cotes = ""  # Réinitialisation obligatoire

# Ajout des fonction de choix de cotès
def Gauche():
    global cotes
    basic.show_leds("""
    # . . . #
    # # . # .
    # # # . .
    # # . # .
    # . . . #
    """)
    cotes = "gauche"
input.on_button_pressed(Button.A, Gauche)

def Droite():
    global cotes
    basic.show_leds("""
    # . . . #
    . # . # #
    . . # # #
    . # . # #
    # . . . #
    """)
    cotes = "droite"
input.on_button_pressed(Button.B, Droite)

# Affiche un "?" au début pour forcer le choix
basic.show_string("?")

def countTime():
    global start_time, servoBool, vide, cotes
    if pins.digital_read_pin(DigitalPin.P0):
        maqueen.write_led(maqueen.LED.LED_RIGHT, maqueen.LEDswitch.TURN_ON)
        maqueen.write_led(maqueen.LED.LED_LEFT, maqueen.LEDswitch.TURN_ON)
    else:
        maqueen.write_led(maqueen.LED.LED_RIGHT, maqueen.LEDswitch.TURN_OFF)
        maqueen.write_led(maqueen.LED.LED_LEFT, maqueen.LEDswitch.TURN_OFF)

    if start_time == -1 and pins.digital_read_pin(DigitalPin.P0) == 0:
        start_time = control.millis()

    if start_time != -1:
        time = control.millis() - start_time

        if cotes == "gauche":
            if 3000 < time < 9650:
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            elif 9650 <= time < 9850:
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 100)
            elif 9850 <= time < 18000 and vide:
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

        elif cotes == "droite":
            if 3000 < time < 9650:
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            elif 9650 <= time < 9850:
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 100)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
            elif 9850 <= time < 18000 and vide:
                maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 23)
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
    vide = maqueen.ultrasonic() <= 5
basic.forever(on_forever)
