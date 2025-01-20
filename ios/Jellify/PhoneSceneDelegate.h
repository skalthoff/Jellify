#import <UIKit/UIKit.h>

@interface PhoneSceneDelegate : UIResponder <UIWindowSceneDelegate>

@property (nonatomic, strong) UIWindow *window;

- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions;

@end