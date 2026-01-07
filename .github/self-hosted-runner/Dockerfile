# Custom GitHub Actions Runner with Node.js, Bun, and Android tools
FROM myoung34/github-runner:latest

# Switch to root for installation
USER root

# Install Node.js 20 (LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && node --version \
    && npm --version

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash \
    && mv /root/.bun/bin/bun /usr/local/bin/ \
    && bun --version

# Install JDK 17 for Android builds
RUN apt-get update && apt-get install -y openjdk-17-jdk \
    && java -version

# Install Android SDK command-line tools
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV ANDROID_HOME=$ANDROID_SDK_ROOT
ENV PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools \
    && cd $ANDROID_SDK_ROOT/cmdline-tools \
    && curl -o commandlinetools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip \
    && unzip commandlinetools.zip \
    && rm commandlinetools.zip \
    && mv cmdline-tools latest \
    && yes | $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses || true \
    && $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Install Ruby and Bundler for Fastlane
RUN apt-get install -y ruby-full \
    && gem install bundler

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Switch back to runner user
USER runner
