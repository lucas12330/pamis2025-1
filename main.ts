//  Programme de Lucas Bezanilla Bou
//  Adaptable selon le contexte du concour
//  Les direction sont sois CW sois CCW
let start_time = -1
//  Programme non démarré
let servoBool = true
let vide = true
let cotes = ""
//  Ajout des fonction de choix de cotès
input.onButtonPressed(Button.A, function Gauche() {
    let cotes = "gauche"
})
input.onButtonPressed(Button.B, function Droite() {
    let cotes = "droite"
})
basic.forever(function countTime() {
    let time: number;
    let i: number;
    
    //  Vérifier si le capteur P0 est activé et que le programme n'a pas encore démarré
    if (start_time == -1 && pins.digitalReadPin(DigitalPin.P0) == 0) {
        start_time = control.millis()
    }
    
    //  Démarrer le timer une seule fois
    //  Exécuter la logique seulement si le programme a commencé
    if (start_time != -1) {
        time = control.millis() - start_time
        //  Temps écoulé
        //  Réaliser pour le cotès gauche
        if (cotes == "gauche") {
            //  Les temps sont a changé le jour du concour 85k<time<91650
            if (3000 < time && time < 9650) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            } else if (time < 9850) {
                //  Les temps ici le jour du concour sont time<91850
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
            } else if (time < 18000 && vide) {
                // Pour cette action les temps sont time < 100000:
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 17)
            } else if (servoBool) {
                maqueen.motorStop(maqueen.Motors.All)
                //  Peut être modifier mais avec prudence suivant les recomandation des arbitre
                //  ainsi que des juges d'homologation
                for (i = 0; i < 4; i++) {
                    maqueen.servoRun(maqueen.Servos.S1, 180)
                    basic.pause(200)
                    maqueen.servoRun(maqueen.Servos.S1, 0)
                    basic.pause(200)
                    maqueen.servoRun(maqueen.Servos.S1, 180)
                }
                servoBool = false
            } else {
                maqueen.motorStop(maqueen.Motors.All)
            }
            
        } else if (cotes == "droite") {
            // Réaliser pour le cotès droit
            //  Les temps sont a changé le jour du concour 85k<time<91650
            if (3000 < time && time < 9650) {
                // Permet de faire passer cette action dans un intervalle de temps
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            } else if (time < 9850) {
                //  Les temps ici le jour du concour sont time<91850
                //  Pour le cotès droit ils faut simplement changé le sens 
                //  De rotation du Pami
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
            } else if (time < 18000 && vide) {
                // Pour cette action les temps sont time < 100000: 
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 17)
            } else if (servoBool) {
                maqueen.motorStop(maqueen.Motors.All)
                for (i = 0; i < 4; i++) {
                    maqueen.servoRun(maqueen.Servos.S1, 180)
                    basic.pause(200)
                    maqueen.servoRun(maqueen.Servos.S1, 0)
                    basic.pause(200)
                    maqueen.servoRun(maqueen.Servos.S1, 180)
                }
                servoBool = false
            } else {
                maqueen.motorStop(maqueen.Motors.All)
            }
            
        }
        
    }
    
})
//  ne jamais remplacer par des while true car ce sont des boucle fermé
//  Met à jour `vide` automatiquement
basic.forever(function on_forever() {
    
    vide = maqueen.Ultrasonic() <= 5
})
