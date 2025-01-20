#import <Foundation/Foundation.h>
#import <CarPlay/CarPlay.h>

@interface CarSceneDelegate : UIResponder <CPTemplateApplicationSceneDelegate>

- (void)templateApplicationScene:(CPTemplateApplicationScene *)templateApplicationScene
              didConnectInterfaceController:(CPInterfaceController *)interfaceController;

- (void)templateApplicationScene:(CPTemplateApplicationScene *)templateApplicationScene
            didDisconnectInterfaceController:(CPInterfaceController *)interfaceController;

@end