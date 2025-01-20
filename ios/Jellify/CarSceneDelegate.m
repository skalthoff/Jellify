// CarSceneDelegate.mm

#import "CarSceneDelegate.h"
#import "AppDelegate.h"
#import <CarPlay/CarPlay.h>
#import <React/RCTBridge.h>
#import "RNCarPlay.h"

@implementation CarSceneDelegate

- (void)templateApplicationScene:(CPTemplateApplicationScene *)templateApplicationScene
              didConnectInterfaceController:(CPInterfaceController *)interfaceController {
  // Ensure the app delegate is accessible and is of type AppDelegate
  AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
  if (!appDelegate) return;

  // Initialize the React Native app (passing nil as connectionOptions)
  [appDelegate initAppFromScene:connectionOptions];

  // Connect RNCarPlay to the CarPlay interface controller and window
  [RNCarPlay connectWithInterfaceController:interfaceController window:templateApplicationScene.carWindow];
}

- (void)templateApplicationScene:(CPTemplateApplicationScene *)templateApplicationScene
            didDisconnectInterfaceController:(CPInterfaceController *)interfaceController {
  // Disconnect RNCarPlay when the interface controller is disconnected
  [RNCarPlay disconnect];
}

@end
