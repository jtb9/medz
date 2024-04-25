from tkinter import Label
from kivy.app import App
from kivy.uix.widget import Widget
from kivy.properties import NumericProperty, ReferenceListProperty
from kivy.vector import Vector
from kivy.clock import Clock
from kivy.uix.button import Button
from kivy.core.window import Window
from kivy.uix.gridlayout import GridLayout
from kivy.metrics import dp, sp
#Window.size = (1280, 720)

shelves = [{"idd": 'shelv1', "lbl": 'test'}]


class Medz(GridLayout):
    def ensureShelvesHaveElement(self):
        for s in shelves:
            print(s)
            if s['idd'] in self.ids:
                ## update its label
                n = False
            else:
                ## add it
                newShelf = GridLayout(orientation='lr-tb')
                
                newLabel = Label()
                newLabel.text = " A veryyyyyyyyyyyyyyyyyyyyy long text."
                newLabel.font_size = sp(30)
                newLabel.size_hint = (None, None)
                newLabel.height = dp(30)
                newLabel.bind(self)
                
                newShelf.add_widget(newLabel)
                # newLabel = Label(text=s['lbl'])
                # newShelf.add_widget(newLabel)
        
                self.ids['blayout'].add_widget(newShelf)
    
    def addButton(self):
        print("no op")
    pass


class MedzApp(App):
    def build(self):
        self.width = Window.width
        self.height = Window.height
        m = Medz()
        m.ensureShelvesHaveElement()
        return m

if __name__ == '__main__':
    MedzApp().run()
