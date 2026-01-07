# Custom GitHub Actions Runner with Node.js, Bun, and Android tools
FROM myoung34/github-runner:latest

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

# Install Ruby 3.0 into the tool cache for setup-ruby action
# Install dependencies for building Ruby
RUN apt-get update && apt-get install -y \
    autoconf \
    bison \
    build-essential \
    libssl-dev \
    libyaml-dev \
    libreadline6-dev \
    zlib1g-dev \
    libncurses5-dev \
    libffi-dev \
    libgdbm6 \
    libgdbm-dev \
    libdb-dev \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install ruby-build
RUN git clone https://github.com/rbenv/ruby-build.git /tmp/ruby-build \
    && /tmp/ruby-build/install.sh \
    && rm -rf /tmp/ruby-build

# Install Ruby 3.0 to hostedtoolcache (setup-ruby expects this)
# Using 3.0.6 as a stable 3.0 release
ENV RUNNER_TOOL_CACHE=/opt/hostedtoolcache
RUN mkdir -p ${RUNNER_TOOL_CACHE}/Ruby/3.0.6/x64 \
    && ruby-build 3.0.6 ${RUNNER_TOOL_CACHE}/Ruby/3.0.6/x64 \
    && touch ${RUNNER_TOOL_CACHE}/Ruby/3.0.6/x64.complete

# Also create a '3.0' alias/symlink if possible or just rely on semver matching
# setup-ruby usually finds 3.0.6 when asked for 3.0


# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
